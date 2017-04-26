#version 150

uniform mat4 modelViewProjectionMatrix;

in vec4 position;
in vec2 texcoord;
in vec4 color;
in vec4 normal;



uniform sampler2D srcSampler;
uniform sampler2D paletteSampler;


uniform float clockGlobalTime = 0.0;

uniform float dof = 0.1;

uniform float kinectZMin = 0.0;
uniform float kinectZMax = 10.0;
uniform float kinectZPow = 3.0;
uniform float kinectFOV = 46.6;
uniform float kinectFocusDepth = 0.5;
uniform int   kinectDepthSamples = 1;

uniform float quadFace = 0.1;
uniform float quadFaceW = 0.1;
uniform float quadFaceH = 0.1;
uniform float quadExpand = 1.25;



// this is something we're creating for this shader
out vec2 videoCoord;
out vec2 depthCoord;
out vec2 quadCoord;
out vec4 colourMult;
out float depth;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float quadToDepth( vec2 quadCentre, vec2 quadSize ) {

  vec2 depthSampleCoord;
  depthSampleCoord = vec2(0.0,0.0);

  depthSampleCoord += quadCentre;
  depthSampleCoord.x *= 0.5;
  depthSampleCoord.x += 0.5;

  return texture(srcSampler, depthSampleCoord).g;
}


float depthToZ( float raw ) {
  float a = pow( raw, 0.1/kinectZPow );
  return mix( -kinectZMax, -kinectZMin, a );
}

void main()
{
  vec2 quadCentre = color.ba;
  vec2 quadSize = vec2( 1. / normal.x, 1. / normal.y ) * 2.0;

  quadCoord = color.rg;

  videoCoord = vec2(texcoord.x, texcoord.y);
  videoCoord.x *= 0.5;

  depthCoord = quadCentre;
  depthCoord.x *= 0.5;
  depthCoord.x += 0.5;

  float depth = quadToDepth( quadCentre, quadSize );
  float zSource = depthToZ( depth );
  float zOffset = depthToZ( kinectFocusDepth );

  float focus = ( depth - kinectFocusDepth );
  focus /= dof;
  focus = focus * 0.66 + 0.66;
  focus = clamp( focus, 0.0, 1.0 );
  colourMult = texture( paletteSampler, vec2( focus, 0. ) );

  float zSlope = tan(kinectFOV/180.0*3.1415926/2.0);

  vec2 quadCentreScreen = quadCentre * 2.0 - vec2(1.0,1.0);

  vec4 pos = position;
  pos.xy = mix( quadCentreScreen + ( position.xy - quadCentreScreen ) * quadExpand, quadCentreScreen, quadFace );
  pos.x *= -1.0;
  pos.z = zSource;

  float scale = zSlope/zOffset;
  scale = -zSlope/zOffset*0.5;
  pos.xy *= -zSource * zSlope;
  pos.z -= zOffset;
  pos.xzy *= scale;



  pos = modelViewProjectionMatrix * pos;

  pos.x += quadFaceW * quadFace * (color.r - 0.5) * -2.0;
  pos.y += quadFaceH * quadFace * (color.g - 0.5) * 2.0;

  gl_Position = pos;
}
