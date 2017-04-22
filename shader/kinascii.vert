#version 150

uniform mat4 modelViewProjectionMatrix;

in vec4 position;
in vec2 texcoord;
in vec4 color;
in vec4 normal;



uniform sampler2D srcSampler;

uniform float clockGlobalTime = 0.0;

uniform float kinectZMin = 0.0;
uniform float kinectZMax = 10.0;
uniform float kinectZPow = 3.0;
uniform float kinectFOV = 46.6;
uniform float kinectFocusDepth = 0.5;
uniform int   kinectDepthSamples = 64;

uniform float quadFace = 0.1;

// this is something we're creating for this shader
out vec2 videoCoord;
out vec2 depthCoord;
out vec4 colourMult;
out float depth;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}



float quadToDepth( vec2 quadCentre, vec2 quadSize ) {
  float depth = 0.0;
  float samples = 0.0;

  for ( int i = 0; i < kinectDepthSamples; i ++ ) {
    vec2 depthSampleCoord;
    depthSampleCoord = vec2(0.0,0.0);
    depthSampleCoord.x += rand( vec2( clockGlobalTime, float(i) * 12345.6789 ) );
    depthSampleCoord.y += rand( vec2( float(i) * 456.789, -clockGlobalTime ) );
    depthSampleCoord += vec2(-0.5,-0.5);
    // depthSampleCoord *= 6.0;
    depthSampleCoord *= quadSize;

    depthSampleCoord += quadCentre;
    depthSampleCoord.x *= 0.5;
    depthSampleCoord.x += 0.5;

    float depthSample = texture(srcSampler, depthSampleCoord).g;

    if ( depthSample > 0.0 ) {
      float weight = depthSample;
      depth += depthSample * weight;
      samples += weight;
    }
  }

  depth /= samples;
  return depth;
}


float depthToZ( float raw ) {
  float a = pow( raw, 0.1/kinectZPow );
  return mix( -kinectZMax, -kinectZMin, a );
}

void main()
{
  vec2 quadCentre = color.ba;
  vec2 quadSize = vec2( 1. / normal.x, 1. / normal.y ) * 2.0;

  videoCoord = vec2(texcoord.x, texcoord.y);
  videoCoord.x *= 0.5;

  depthCoord = quadCentre;
  depthCoord.x *= 0.5;
  depthCoord.x += 0.5;

  float depth = quadToDepth( quadCentre, quadSize );
  float zSource = depthToZ( depth );
  float zOffset = depthToZ( kinectFocusDepth );

  colourMult = vec4(1.,1.,1.,1.);

  float zSlope = tan(kinectFOV/180.0*3.1415926/2.0);

  vec4 pos = position;
  pos.xy = mix( position.xy, quadCentre * 2.0 - vec2(1.0,1.0), quadFace );
  pos.x *= -1.0;
  pos.z = zSource;

  float scale = zSlope/zOffset;
  scale = -zSlope/zOffset*0.05;
  pos.xy *= -zSource * zSlope;
  pos.z -= zOffset;
  pos.xzy *= scale;

  // pos /= zSlope;
  // pos.x *= 0.1;


  pos = modelViewProjectionMatrix * pos;

  pos.x += 0.001 * quadFace * (color.r - 0.5) * -2.0;
  pos.y += 0.001 * quadFace * (color.g - 0.5) * 2.0;

  gl_Position = pos;
}
