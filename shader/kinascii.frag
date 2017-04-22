#version 150

uniform sampler2D srcSampler;

in vec2 videoCoord;
in vec4 colourMult;

out vec4 outputColour;

void main()
{
  vec3 videoColour = texture(srcSampler, videoCoord).rgb;

  outputColour.rgb = videoColour;
  // outputColour.r = 1.;
  outputColour.a = 1.0;
  // outputColour *= colourMult;
  // outputColour.r = videoCoord.x;
  gl_FragDepth = gl_FragCoord.z;
}
