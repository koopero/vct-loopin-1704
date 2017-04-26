#version 150
uniform sampler2D srcSampler;
uniform sampler2D feedbackSampler;

uniform float feedbackAmount = 1.0;
uniform float fillAmount = 1.0;


in vec2 srcCoord;
out vec4 outputColour;

uniform float kinectBlackThreshold = 0.5 / 255.0;

float resample( sampler2D srcSampler, vec2 srcCoord, float size, int samples ) {

  float total = 0.0;
  float div = 0.0;


  for ( int y = 0; y < samples; y ++ )
  for ( int x = 0; x < samples; x ++ ) {
    vec2 coord = srcCoord + vec2(
      ( x / float( samples - 1 ) - 0.5 ) * size / 1280.0,
      ( y / float( samples - 1 ) - 0.5 ) * size / 480.0
    );

    if ( coord.x < 0.5 ) continue;
    if ( coord.x > 1.0 ) continue;
    if ( coord.y < 0.0 ) continue;
    if ( coord.y > 1.0 ) continue;

    float samp = texture( srcSampler, coord).g;

    if ( samp >= kinectBlackThreshold ) {
      total += samp;
      div += 1.0;
    }
  }

  return div == 0.0 ? div : total / div;
}

void main()
{

  if ( srcCoord.x < 0.5 ) {
    // Sample is video
    vec4 c = texture(srcSampler, srcCoord);
    c.a = 1.0;
    outputColour = c;

  } else {
    // Sample is depth
    float depth = texture(srcSampler, srcCoord).g;
    float amount = 1.0 - feedbackAmount;
    float feedback = texture(feedbackSampler, srcCoord).g;

    if ( depth < kinectBlackThreshold ) {
      depth = resample( srcSampler, srcCoord, 2.0, 3 );
    }

    if ( depth < kinectBlackThreshold ) {
      depth = resample( feedbackSampler, srcCoord, 3.0, 5 );
      amount = 1.0 - fillAmount;
    }

    depth = feedback + ( depth - feedback ) * amount;

    outputColour = vec4( depth, depth, depth, 1.0 );
  }

}
