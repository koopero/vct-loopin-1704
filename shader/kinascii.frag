#version 150

uniform sampler2D srcSampler;
uniform sampler2D charsetSampler;

uniform int charsetRows = 13;

in vec2 videoCoord;
in vec4 colourMult;
in vec2 quadCoord;

out vec4 outputColour;

void main()
{
  vec3 videoColour = texture( srcSampler, videoCoord).rgb;

  outputColour.rgb = videoColour;
  outputColour.a = 1.0;

  outputColour *= colourMult;

  vec2 coord = quadCoord;
  float alpha = outputColour.a;
  int col = int( alpha * charsetRows );
  // coord.x += round( outputColour.a * float(charsetRows) );
  coord.x += col;
  coord.x /= float(charsetRows);

  outputColour *= texture( charsetSampler, coord );


  if ( outputColour.a <= 0. )
    discard;

  gl_FragDepth = gl_FragCoord.z;
}
