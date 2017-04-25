#version 150

uniform mat4 modelViewProjectionMatrix;

in vec4 position;
in vec2 texcoord;
in vec4 color;
in vec4 normal;


uniform mat4 srcMatrix;
uniform sampler2D srcSampler;


out vec2 srcCoord;
out vec4 vertColour;

void main()
{
    srcCoord = vec2(texcoord.x, texcoord.y);
    srcCoord = (srcMatrix*vec4(srcCoord.x,srcCoord.y,0,1)).xy;

    vertColour = vec4(1,1,1,1);

    gl_Position = modelViewProjectionMatrix * position;
}
