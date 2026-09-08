import{c as Ka,N as Ct,S as qa,C as Qe,F as ma,V as ye,R as Za,a as _t,w as pn,M as Yt,W as Kt,b as at,L as Qt,H as Mn,U as Ot,D as Rt,B as vt,d as tn,t as $a,e as ja,f as Tn,p as Qa,g as Ja,h as nn,i as qt,j as dt,O as er,P as hn,k as ga,l as jn,E as tr,m as $e,A as nr,n as Cn,o as bt,q as vn,r as Qn,s as an,u as rn,v as va,x as ir,y as Ft,z as Nt,G as xn,I as Ea,J as _n,K as kt,Q as Vt,T as En,X as ar,Y as rr,Z as jt,_ as or,$ as sr,a0 as lr,a1 as cr,a2 as fr,a3 as dr,a4 as ur,a5 as pr,a6 as hr,a7 as _r,a8 as mr,a9 as gr,aa as vr,ab as Er,ac as Sr,ad as Mr,ae as Tr,af as xr,ag as Pn,ah as ln,ai as Ar,aj as en,ak as Rr,al as br,am as Cr,an as Pr,ao as Sa,ap as Dr,aq as Lr,ar as Ur,as as Ma,at as Fe,au as wr,av as yr,aw as Ir,ax as Ta,ay as At,az as Sn,aA as xa,aB as Aa,aC as Ra,aD as ba,aE as Nr,aF as Or,aG as Fr,aH as Ca,aI as It,aJ as Br,aK as Hr,aL as Gr,aM as Pa,aN as Vr,aO as Da,aP as La,aQ as Dn,aR as Ln,aS as Un,aT as wn,aU as Ze,aV as li,aW as ci,aX as fi,aY as di,aZ as ui,a_ as pi,a$ as hi,b0 as _i,b1 as mi,b2 as gi,b3 as vi,b4 as Ei,b5 as Si,b6 as Mi,b7 as Ti,b8 as xi,b9 as Ai,ba as Ri,bb as bi,bc as Ci,bd as Pi,be as yn,bf as Di,bg as Li,bh as kr,bi as Ui,bj as wi,bk as yi,bl as Vn,bm as kn,bn as zn,bo as Wn,bp as Xn,bq as Yn,br as Kn,bs as zr,bt as Ii,bu as Wr,bv as mn,bw as Xr,bx as Ni,by as Oi,bz as Fi,bA as qn,bB as Zn,bC as Yr,bD as Ua,bE as Kr,bF as qr,bG as Zr,bH as wa,bI as Bi,bJ as ya,bK as Hi,bL as Ia,bM as $r,bN as jr,bO as Qr,bP as Gi,bQ as ht,bR as Jr,bS as eo,bT as to,bU as no,bV as io,bW as ao,bX as ro,bY as oo,bZ as so,b_ as lo,b$ as co,c0 as fo,c1 as uo,c2 as po,c3 as ho,c4 as _o,c5 as mo,c6 as go,c7 as Xt,c8 as zt,c9 as Vi,ca as ki,cb as vo,cc as Eo,cd as So,ce as zi,cf as Mo,cg as To,ch as xo}from"./three-core-G8y-Xr5z.js";/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Na(){let e=null,n=!1,t=null,i=null;function s(o,u){t(o,u),i=e.requestAnimationFrame(s)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(s),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(o){t=o},setContext:function(o){e=o}}}function Ao(e){const n=new WeakMap;function t(c,b){const E=c.array,L=c.usage,M=E.byteLength,v=e.createBuffer();e.bindBuffer(b,v),e.bufferData(b,E,L),c.onUploadCallback();let x;if(E instanceof Float32Array)x=e.FLOAT;else if(typeof Float16Array<"u"&&E instanceof Float16Array)x=e.HALF_FLOAT;else if(E instanceof Uint16Array)c.isFloat16BufferAttribute?x=e.HALF_FLOAT:x=e.UNSIGNED_SHORT;else if(E instanceof Int16Array)x=e.SHORT;else if(E instanceof Uint32Array)x=e.UNSIGNED_INT;else if(E instanceof Int32Array)x=e.INT;else if(E instanceof Int8Array)x=e.BYTE;else if(E instanceof Uint8Array)x=e.UNSIGNED_BYTE;else if(E instanceof Uint8ClampedArray)x=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+E);return{buffer:v,type:x,bytesPerElement:E.BYTES_PER_ELEMENT,version:c.version,size:M}}function i(c,b,E){const L=b.array,M=b.updateRanges;if(e.bindBuffer(E,c),M.length===0)e.bufferSubData(E,0,L);else{M.sort((x,N)=>x.start-N.start);let v=0;for(let x=1;x<M.length;x++){const N=M[v],D=M[x];D.start<=N.start+N.count+1?N.count=Math.max(N.count,D.start+D.count-N.start):(++v,M[v]=D)}M.length=v+1;for(let x=0,N=M.length;x<N;x++){const D=M[x];e.bufferSubData(E,D.start*L.BYTES_PER_ELEMENT,L,D.start,D.count)}b.clearUpdateRanges()}b.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const b=n.get(c);b&&(e.deleteBuffer(b.buffer),n.delete(c))}function u(c,b){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const L=n.get(c);(!L||L.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const E=n.get(c);if(E===void 0)n.set(c,t(c,b));else if(E.version<c.version){if(E.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(E.buffer,c,b),E.version=c.version}}return{get:s,remove:o,update:u}}var Ro=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bo=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Co=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Po=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Do=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lo=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Uo=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wo=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yo=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Io=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,No=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Oo=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fo=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bo=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ho=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Go=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Vo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ko=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zo=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wo=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ko=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,qo=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zo=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$o=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,jo=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qo=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jo=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,es=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ts="gl_FragColor = linearToOutputTexel( gl_FragColor );",ns=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,is=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,as=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rs=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,os=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ss=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ls=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cs=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fs=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ds=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,us=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ps=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hs=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_s=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ms=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gs=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vs=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Es=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ss=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ms=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ts=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xs=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,As=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rs=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bs=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cs=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ps=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ds=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ls=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Us=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ws=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ys=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Is=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ns=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Os=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fs=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bs=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hs=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gs=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Vs=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ks=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zs=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ws=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ys=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ks=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qs=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zs=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$s=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,js=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qs=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Js=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,el=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nl=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,il=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,al=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rl=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ol=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sl=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ll=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cl=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fl=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dl=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ul=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pl=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hl=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_l=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ml=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gl=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vl=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,El=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Sl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ml=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,xl=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Al=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rl=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cl=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dl=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ll=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ul=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wl=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,yl=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Il=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nl=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ol=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fl=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bl=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Hl=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gl=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vl=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kl=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zl=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wl=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xl=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Yl=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kl=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ql=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zl=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$l=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jl=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ql=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jl=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ec=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tc=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nc=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ic=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ue={alphahash_fragment:Ro,alphahash_pars_fragment:bo,alphamap_fragment:Co,alphamap_pars_fragment:Po,alphatest_fragment:Do,alphatest_pars_fragment:Lo,aomap_fragment:Uo,aomap_pars_fragment:wo,batching_pars_vertex:yo,batching_vertex:Io,begin_vertex:No,beginnormal_vertex:Oo,bsdfs:Fo,iridescence_fragment:Bo,bumpmap_pars_fragment:Ho,clipping_planes_fragment:Go,clipping_planes_pars_fragment:Vo,clipping_planes_pars_vertex:ko,clipping_planes_vertex:zo,color_fragment:Wo,color_pars_fragment:Xo,color_pars_vertex:Yo,color_vertex:Ko,common:qo,cube_uv_reflection_fragment:Zo,defaultnormal_vertex:$o,displacementmap_pars_vertex:jo,displacementmap_vertex:Qo,emissivemap_fragment:Jo,emissivemap_pars_fragment:es,colorspace_fragment:ts,colorspace_pars_fragment:ns,envmap_fragment:is,envmap_common_pars_fragment:as,envmap_pars_fragment:rs,envmap_pars_vertex:os,envmap_physical_pars_fragment:gs,envmap_vertex:ss,fog_vertex:ls,fog_pars_vertex:cs,fog_fragment:fs,fog_pars_fragment:ds,gradientmap_pars_fragment:us,lightmap_pars_fragment:ps,lights_lambert_fragment:hs,lights_lambert_pars_fragment:_s,lights_pars_begin:ms,lights_toon_fragment:vs,lights_toon_pars_fragment:Es,lights_phong_fragment:Ss,lights_phong_pars_fragment:Ms,lights_physical_fragment:Ts,lights_physical_pars_fragment:xs,lights_fragment_begin:As,lights_fragment_maps:Rs,lights_fragment_end:bs,logdepthbuf_fragment:Cs,logdepthbuf_pars_fragment:Ps,logdepthbuf_pars_vertex:Ds,logdepthbuf_vertex:Ls,map_fragment:Us,map_pars_fragment:ws,map_particle_fragment:ys,map_particle_pars_fragment:Is,metalnessmap_fragment:Ns,metalnessmap_pars_fragment:Os,morphinstance_vertex:Fs,morphcolor_vertex:Bs,morphnormal_vertex:Hs,morphtarget_pars_vertex:Gs,morphtarget_vertex:Vs,normal_fragment_begin:ks,normal_fragment_maps:zs,normal_pars_fragment:Ws,normal_pars_vertex:Xs,normal_vertex:Ys,normalmap_pars_fragment:Ks,clearcoat_normal_fragment_begin:qs,clearcoat_normal_fragment_maps:Zs,clearcoat_pars_fragment:$s,iridescence_pars_fragment:js,opaque_fragment:Qs,packing:Js,premultiplied_alpha_fragment:el,project_vertex:tl,dithering_fragment:nl,dithering_pars_fragment:il,roughnessmap_fragment:al,roughnessmap_pars_fragment:rl,shadowmap_pars_fragment:ol,shadowmap_pars_vertex:sl,shadowmap_vertex:ll,shadowmask_pars_fragment:cl,skinbase_vertex:fl,skinning_pars_vertex:dl,skinning_vertex:ul,skinnormal_vertex:pl,specularmap_fragment:hl,specularmap_pars_fragment:_l,tonemapping_fragment:ml,tonemapping_pars_fragment:gl,transmission_fragment:vl,transmission_pars_fragment:El,uv_pars_fragment:Sl,uv_pars_vertex:Ml,uv_vertex:Tl,worldpos_vertex:xl,background_vert:Al,background_frag:Rl,backgroundCube_vert:bl,backgroundCube_frag:Cl,cube_vert:Pl,cube_frag:Dl,depth_vert:Ll,depth_frag:Ul,distanceRGBA_vert:wl,distanceRGBA_frag:yl,equirect_vert:Il,equirect_frag:Nl,linedashed_vert:Ol,linedashed_frag:Fl,meshbasic_vert:Bl,meshbasic_frag:Hl,meshlambert_vert:Gl,meshlambert_frag:Vl,meshmatcap_vert:kl,meshmatcap_frag:zl,meshnormal_vert:Wl,meshnormal_frag:Xl,meshphong_vert:Yl,meshphong_frag:Kl,meshphysical_vert:ql,meshphysical_frag:Zl,meshtoon_vert:$l,meshtoon_frag:jl,points_vert:Ql,points_frag:Jl,shadow_vert:ec,shadow_frag:tc,sprite_vert:nc,sprite_frag:ic},ne={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},Tt={basic:{uniforms:ht([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:ht([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:ht([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:ht([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:ht([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:ht([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:ht([ne.points,ne.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:ht([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:ht([ne.common,ne.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:ht([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:ht([ne.sprite,ne.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:ht([ne.common,ne.displacementmap,{referencePosition:{value:new ye},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:ht([ne.lights,ne.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Tt.physical={uniforms:ht([Tt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const cn={r:0,b:0,g:0},Lt=new ya,ac=new Yt;function rc(e,n,t,i,s,o,u){const c=new Qe(0);let b=o===!0?0:1,E,L,M=null,v=0,x=null;function N(A){let m=A.isScene===!0?A.background:null;return m&&m.isTexture&&(m=(A.backgroundBlurriness>0?t:n).get(m)),m}function D(A){let m=!1;const G=N(A);G===null?a(c,b):G&&G.isColor&&(a(G,1),m=!0);const P=e.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,u):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,u),(e.autoClear||m)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function f(A,m){const G=N(m);G&&(G.isCubeTexture||G.mapping===xn)?(L===void 0&&(L=new dt(new jn(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:Bi(Tt.backgroundCube.uniforms),vertexShader:Tt.backgroundCube.vertexShader,fragmentShader:Tt.backgroundCube.fragmentShader,side:vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),L.geometry.deleteAttribute("normal"),L.geometry.deleteAttribute("uv"),L.onBeforeRender=function(P,I,H){this.matrixWorld.copyPosition(H.matrixWorld)},Object.defineProperty(L.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(L)),Lt.copy(m.backgroundRotation),Lt.x*=-1,Lt.y*=-1,Lt.z*=-1,G.isCubeTexture&&G.isRenderTargetTexture===!1&&(Lt.y*=-1,Lt.z*=-1),L.material.uniforms.envMap.value=G,L.material.uniforms.flipEnvMap.value=G.isCubeTexture&&G.isRenderTargetTexture===!1?-1:1,L.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,L.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,L.material.uniforms.backgroundRotation.value.setFromMatrix4(ac.makeRotationFromEuler(Lt)),L.material.toneMapped=at.getTransfer(G.colorSpace)!==Ze,(M!==G||v!==G.version||x!==e.toneMapping)&&(L.material.needsUpdate=!0,M=G,v=G.version,x=e.toneMapping),L.layers.enableAll(),A.unshift(L,L.geometry,L.material,0,0,null)):G&&G.isTexture&&(E===void 0&&(E=new dt(new ba(2,2),new Ft({name:"BackgroundMaterial",uniforms:Bi(Tt.background.uniforms),vertexShader:Tt.background.vertexShader,fragmentShader:Tt.background.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),E.geometry.deleteAttribute("normal"),Object.defineProperty(E.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(E)),E.material.uniforms.t2D.value=G,E.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,E.material.toneMapped=at.getTransfer(G.colorSpace)!==Ze,G.matrixAutoUpdate===!0&&G.updateMatrix(),E.material.uniforms.uvTransform.value.copy(G.matrix),(M!==G||v!==G.version||x!==e.toneMapping)&&(E.material.needsUpdate=!0,M=G,v=G.version,x=e.toneMapping),E.layers.enableAll(),A.unshift(E,E.geometry,E.material,0,0,null))}function a(A,m){A.getRGB(cn,wa(e)),i.buffers.color.setClear(cn.r,cn.g,cn.b,m,u)}function U(){L!==void 0&&(L.geometry.dispose(),L.material.dispose(),L=void 0),E!==void 0&&(E.geometry.dispose(),E.material.dispose(),E=void 0)}return{getClearColor:function(){return c},setClearColor:function(A,m=1){c.set(A),b=m,a(c,b)},getClearAlpha:function(){return b},setClearAlpha:function(A){b=A,a(c,b)},render:D,addToRenderList:f,dispose:U}}function oc(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=v(null);let o=s,u=!1;function c(d,R,K,V,Y){let Q=!1;const W=M(V,K,R);o!==W&&(o=W,E(o.object)),Q=x(d,V,K,Y),Q&&N(d,V,K,Y),Y!==null&&n.update(Y,e.ELEMENT_ARRAY_BUFFER),(Q||u)&&(u=!1,m(d,R,K,V),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Y).buffer))}function b(){return e.createVertexArray()}function E(d){return e.bindVertexArray(d)}function L(d){return e.deleteVertexArray(d)}function M(d,R,K){const V=K.wireframe===!0;let Y=i[d.id];Y===void 0&&(Y={},i[d.id]=Y);let Q=Y[R.id];Q===void 0&&(Q={},Y[R.id]=Q);let W=Q[V];return W===void 0&&(W=v(b()),Q[V]=W),W}function v(d){const R=[],K=[],V=[];for(let Y=0;Y<t;Y++)R[Y]=0,K[Y]=0,V[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:K,attributeDivisors:V,object:d,attributes:{},index:null}}function x(d,R,K,V){const Y=o.attributes,Q=R.attributes;let W=0;const ee=K.getAttributes();for(const F in ee)if(ee[F].location>=0){const Ae=Y[F];let we=Q[F];if(we===void 0&&(F==="instanceMatrix"&&d.instanceMatrix&&(we=d.instanceMatrix),F==="instanceColor"&&d.instanceColor&&(we=d.instanceColor)),Ae===void 0||Ae.attribute!==we||we&&Ae.data!==we.data)return!0;W++}return o.attributesNum!==W||o.index!==V}function N(d,R,K,V){const Y={},Q=R.attributes;let W=0;const ee=K.getAttributes();for(const F in ee)if(ee[F].location>=0){let Ae=Q[F];Ae===void 0&&(F==="instanceMatrix"&&d.instanceMatrix&&(Ae=d.instanceMatrix),F==="instanceColor"&&d.instanceColor&&(Ae=d.instanceColor));const we={};we.attribute=Ae,Ae&&Ae.data&&(we.data=Ae.data),Y[F]=we,W++}o.attributes=Y,o.attributesNum=W,o.index=V}function D(){const d=o.newAttributes;for(let R=0,K=d.length;R<K;R++)d[R]=0}function f(d){a(d,0)}function a(d,R){const K=o.newAttributes,V=o.enabledAttributes,Y=o.attributeDivisors;K[d]=1,V[d]===0&&(e.enableVertexAttribArray(d),V[d]=1),Y[d]!==R&&(e.vertexAttribDivisor(d,R),Y[d]=R)}function U(){const d=o.newAttributes,R=o.enabledAttributes;for(let K=0,V=R.length;K<V;K++)R[K]!==d[K]&&(e.disableVertexAttribArray(K),R[K]=0)}function A(d,R,K,V,Y,Q,W){W===!0?e.vertexAttribIPointer(d,R,K,Y,Q):e.vertexAttribPointer(d,R,K,V,Y,Q)}function m(d,R,K,V){D();const Y=V.attributes,Q=K.getAttributes(),W=R.defaultAttributeValues;for(const ee in Q){const F=Q[ee];if(F.location>=0){let ve=Y[ee];if(ve===void 0&&(ee==="instanceMatrix"&&d.instanceMatrix&&(ve=d.instanceMatrix),ee==="instanceColor"&&d.instanceColor&&(ve=d.instanceColor)),ve!==void 0){const Ae=ve.normalized,we=ve.itemSize,Ve=n.get(ve);if(Ve===void 0)continue;const nt=Ve.buffer,k=Ve.type,J=Ve.bytesPerElement,me=k===e.INT||k===e.UNSIGNED_INT||ve.gpuType===Ca;if(ve.isInterleavedBufferAttribute){const oe=ve.data,ge=oe.stride,Be=ve.offset;if(oe.isInstancedInterleavedBuffer){for(let Re=0;Re<F.locationSize;Re++)a(F.location+Re,oe.meshPerAttribute);d.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Re=0;Re<F.locationSize;Re++)f(F.location+Re);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let Re=0;Re<F.locationSize;Re++)A(F.location+Re,we/F.locationSize,k,Ae,ge*J,(Be+we/F.locationSize*Re)*J,me)}else{if(ve.isInstancedBufferAttribute){for(let oe=0;oe<F.locationSize;oe++)a(F.location+oe,ve.meshPerAttribute);d.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let oe=0;oe<F.locationSize;oe++)f(F.location+oe);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let oe=0;oe<F.locationSize;oe++)A(F.location+oe,we/F.locationSize,k,Ae,we*J,we/F.locationSize*oe*J,me)}}else if(W!==void 0){const Ae=W[ee];if(Ae!==void 0)switch(Ae.length){case 2:e.vertexAttrib2fv(F.location,Ae);break;case 3:e.vertexAttrib3fv(F.location,Ae);break;case 4:e.vertexAttrib4fv(F.location,Ae);break;default:e.vertexAttrib1fv(F.location,Ae)}}}}U()}function G(){H();for(const d in i){const R=i[d];for(const K in R){const V=R[K];for(const Y in V)L(V[Y].object),delete V[Y];delete R[K]}delete i[d]}}function P(d){if(i[d.id]===void 0)return;const R=i[d.id];for(const K in R){const V=R[K];for(const Y in V)L(V[Y].object),delete V[Y];delete R[K]}delete i[d.id]}function I(d){for(const R in i){const K=i[R];if(K[d.id]===void 0)continue;const V=K[d.id];for(const Y in V)L(V[Y].object),delete V[Y];delete K[d.id]}}function H(){h(),u=!0,o!==s&&(o=s,E(o.object))}function h(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:H,resetDefaultState:h,dispose:G,releaseStatesOfGeometry:P,releaseStatesOfProgram:I,initAttributes:D,enableAttribute:f,disableUnusedAttributes:U}}function sc(e,n,t){let i;function s(E){i=E}function o(E,L){e.drawArrays(i,E,L),t.update(L,i,1)}function u(E,L,M){M!==0&&(e.drawArraysInstanced(i,E,L,M),t.update(L,i,M))}function c(E,L,M){if(M===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,E,0,L,0,M);let x=0;for(let N=0;N<M;N++)x+=L[N];t.update(x,i,1)}function b(E,L,M,v){if(M===0)return;const x=n.get("WEBGL_multi_draw");if(x===null)for(let N=0;N<E.length;N++)u(E[N],L[N],v[N]);else{x.multiDrawArraysInstancedWEBGL(i,E,0,L,0,v,0,M);let N=0;for(let D=0;D<M;D++)N+=L[D]*v[D];t.update(N,i,1)}}this.setMode=s,this.render=o,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=b}function lc(e,n,t,i){let s;function o(){if(s!==void 0)return s;if(n.has("EXT_texture_filter_anisotropic")===!0){const I=n.get("EXT_texture_filter_anisotropic");s=e.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function u(I){return!(I!==bt&&i.convert(I)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(I){const H=I===Mn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(I!==Ot&&i.convert(I)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==It&&!H)}function b(I){if(I==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let E=t.precision!==void 0?t.precision:"highp";const L=b(E);L!==E&&(console.warn("THREE.WebGLRenderer:",E,"not supported, using",L,"instead."),E=L);const M=t.logarithmicDepthBuffer===!0,v=t.reverseDepthBuffer===!0&&n.has("EXT_clip_control"),x=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),N=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),a=e.getParameter(e.MAX_VERTEX_ATTRIBS),U=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),A=e.getParameter(e.MAX_VARYING_VECTORS),m=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),G=N>0,P=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:b,textureFormatReadable:u,textureTypeReadable:c,precision:E,logarithmicDepthBuffer:M,reverseDepthBuffer:v,maxTextures:x,maxVertexTextures:N,maxTextureSize:D,maxCubemapSize:f,maxAttributes:a,maxVertexUniforms:U,maxVaryings:A,maxFragmentUniforms:m,vertexTextures:G,maxSamples:P}}function cc(e){const n=this;let t=null,i=0,s=!1,o=!1;const u=new Ma,c=new Fe,b={value:null,needsUpdate:!1};this.uniform=b,this.numPlanes=0,this.numIntersection=0,this.init=function(M,v){const x=M.length!==0||v||i!==0||s;return s=v,i=M.length,x},this.beginShadows=function(){o=!0,L(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(M,v){t=L(M,v,0)},this.setState=function(M,v,x){const N=M.clippingPlanes,D=M.clipIntersection,f=M.clipShadows,a=e.get(M);if(!s||N===null||N.length===0||o&&!f)o?L(null):E();else{const U=o?0:i,A=U*4;let m=a.clippingState||null;b.value=m,m=L(N,v,A,x);for(let G=0;G!==A;++G)m[G]=t[G];a.clippingState=m,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=U}};function E(){b.value!==t&&(b.value=t,b.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function L(M,v,x,N){const D=M!==null?M.length:0;let f=null;if(D!==0){if(f=b.value,N!==!0||f===null){const a=x+D*4,U=v.matrixWorldInverse;c.getNormalMatrix(U),(f===null||f.length<a)&&(f=new Float32Array(a));for(let A=0,m=x;A!==D;++A,m+=4)u.copy(M[A]).applyMatrix4(U,c),u.normal.toArray(f,m),f[m+3]=u.constant}b.value=f,b.needsUpdate=!0}return n.numPlanes=D,n.numIntersection=0,f}}function fc(e){let n=new WeakMap;function t(u,c){return c===qn?u.mapping=nn:c===Zn&&(u.mapping=qt),u}function i(u){if(u&&u.isTexture){const c=u.mapping;if(c===qn||c===Zn)if(n.has(u)){const b=n.get(u).texture;return t(b,u.mapping)}else{const b=u.image;if(b&&b.height>0){const E=new Yr(b.height);return E.fromEquirectangularTexture(e,u),n.set(u,E),u.addEventListener("dispose",s),t(E.texture,u.mapping)}else return null}}return u}function s(u){const c=u.target;c.removeEventListener("dispose",s);const b=n.get(c);b!==void 0&&(n.delete(c),b.dispose())}function o(){n=new WeakMap}return{get:i,dispose:o}}const Wt=4,Wi=[.125,.215,.35,.446,.526,.582],yt=20,In=new er,Xi=new Qe;let Nn=null,On=0,Fn=0,Bn=!1;const wt=(1+Math.sqrt(5))/2,Ht=1/wt,Yi=[new ye(-wt,Ht,0),new ye(wt,Ht,0),new ye(-Ht,0,wt),new ye(Ht,0,wt),new ye(0,wt,-Ht),new ye(0,wt,Ht),new ye(-1,1,-1),new ye(1,1,-1),new ye(-1,1,1),new ye(1,1,1)],dc=new ye;class Ki{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,s=100,o={}){const{size:u=256,position:c=dc}=o;Nn=this._renderer.getRenderTarget(),On=this._renderer.getActiveCubeFace(),Fn=this._renderer.getActiveMipmapLevel(),Bn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const b=this._allocateTargets();return b.depthBuffer=!0,this._sceneToCubeUV(n,i,s,b,c),t>0&&this._blur(b,0,0,t),this._applyPMREM(b),this._cleanup(b),b}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$i(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zi(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(Nn,On,Fn),this._renderer.xr.enabled=Bn,n.scissorTest=!1,fn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===nn||n.mapping===qt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Nn=this._renderer.getRenderTarget(),On=this._renderer.getActiveCubeFace(),Fn=this._renderer.getActiveMipmapLevel(),Bn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Mn,format:bt,colorSpace:Tn,depthBuffer:!1},s=qi(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qi(n,t,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=uc(o)),this._blurMaterial=pc(o,n,t)}return s}_compileMaterial(n){const t=new dt(this._lodPlanes[0],n);this._renderer.compile(t,In)}_sceneToCubeUV(n,t,i,s,o){const b=new hn(90,1,t,i),E=[1,-1,1,1,1,1],L=[1,1,1,-1,-1,-1],M=this._renderer,v=M.autoClear,x=M.toneMapping;M.getClearColor(Xi),M.toneMapping=Ct,M.autoClear=!1;const N=new ga({name:"PMREM.Background",side:vt,depthWrite:!1,depthTest:!1}),D=new dt(new jn,N);let f=!1;const a=n.background;a?a.isColor&&(N.color.copy(a),n.background=null,f=!0):(N.color.copy(Xi),f=!0);for(let U=0;U<6;U++){const A=U%3;A===0?(b.up.set(0,E[U],0),b.position.set(o.x,o.y,o.z),b.lookAt(o.x+L[U],o.y,o.z)):A===1?(b.up.set(0,0,E[U]),b.position.set(o.x,o.y,o.z),b.lookAt(o.x,o.y+L[U],o.z)):(b.up.set(0,E[U],0),b.position.set(o.x,o.y,o.z),b.lookAt(o.x,o.y,o.z+L[U]));const m=this._cubeSize;fn(s,A*m,U>2?m:0,m,m),M.setRenderTarget(s),f&&M.render(D,b),M.render(n,b)}D.geometry.dispose(),D.material.dispose(),M.toneMapping=x,M.autoClear=v,n.background=a}_textureToCubeUV(n,t){const i=this._renderer,s=n.mapping===nn||n.mapping===qt;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$i()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zi());const o=s?this._cubemapMaterial:this._equirectMaterial,u=new dt(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=n;const b=this._cubeSize;fn(t,0,0,3*b,2*b),i.setRenderTarget(t),i.render(u,In)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const u=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),c=Yi[(s-o-1)%Yi.length];this._blur(n,o-1,o,u,c)}t.autoClear=i}_blur(n,t,i,s,o){const u=this._pingPongRenderTarget;this._halfBlur(n,u,t,i,s,"latitudinal",o),this._halfBlur(u,n,i,i,s,"longitudinal",o)}_halfBlur(n,t,i,s,o,u,c){const b=this._renderer,E=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const L=3,M=new dt(this._lodPlanes[s],E),v=E.uniforms,x=this._sizeLods[i]-1,N=isFinite(o)?Math.PI/(2*x):2*Math.PI/(2*yt-1),D=o/N,f=isFinite(o)?1+Math.floor(L*D):yt;f>yt&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${yt}`);const a=[];let U=0;for(let I=0;I<yt;++I){const H=I/D,h=Math.exp(-H*H/2);a.push(h),I===0?U+=h:I<f&&(U+=2*h)}for(let I=0;I<a.length;I++)a[I]=a[I]/U;v.envMap.value=n.texture,v.samples.value=f,v.weights.value=a,v.latitudinal.value=u==="latitudinal",c&&(v.poleAxis.value=c);const{_lodMax:A}=this;v.dTheta.value=N,v.mipInt.value=A-i;const m=this._sizeLods[s],G=3*m*(s>A-Wt?s-A+Wt:0),P=4*(this._cubeSize-m);fn(t,G,P,3*m,2*m),b.setRenderTarget(t),b.render(M,In)}}function uc(e){const n=[],t=[],i=[];let s=e;const o=e-Wt+1+Wi.length;for(let u=0;u<o;u++){const c=Math.pow(2,s);t.push(c);let b=1/c;u>e-Wt?b=Wi[u-e+Wt-1]:u===0&&(b=0),i.push(b);const E=1/(c-2),L=-E,M=1+E,v=[L,L,M,L,M,M,L,L,M,M,L,M],x=6,N=6,D=3,f=2,a=1,U=new Float32Array(D*N*x),A=new Float32Array(f*N*x),m=new Float32Array(a*N*x);for(let P=0;P<x;P++){const I=P%3*2/3-1,H=P>2?0:-1,h=[I,H,0,I+2/3,H,0,I+2/3,H+1,0,I,H,0,I+2/3,H+1,0,I,H+1,0];U.set(h,D*N*P),A.set(v,f*N*P);const d=[P,P,P,P,P,P];m.set(d,a*N*P)}const G=new Ea;G.setAttribute("position",new _n(U,D)),G.setAttribute("uv",new _n(A,f)),G.setAttribute("faceIndex",new _n(m,a)),n.push(G),s>Wt&&s--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function qi(e,n,t){const i=new Kt(e,n,t);return i.texture.mapping=xn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fn(e,n,t,i,s){e.viewport.set(n,t,i,s),e.scissor.set(n,t,i,s)}function pc(e,n,t){const i=new Float32Array(yt),s=new ye(0,1,0);return new Ft({name:"SphericalGaussianBlur",defines:{n:yt,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Jn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function Zi(){return new Ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function $i(){return new Ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function Jn(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function hc(e){let n=new WeakMap,t=null;function i(c){if(c&&c.isTexture){const b=c.mapping,E=b===qn||b===Zn,L=b===nn||b===qt;if(E||L){let M=n.get(c);const v=M!==void 0?M.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==v)return t===null&&(t=new Ki(e)),M=E?t.fromEquirectangular(c,M):t.fromCubemap(c,M),M.texture.pmremVersion=c.pmremVersion,n.set(c,M),M.texture;if(M!==void 0)return M.texture;{const x=c.image;return E&&x&&x.height>0||L&&x&&s(x)?(t===null&&(t=new Ki(e)),M=E?t.fromEquirectangular(c):t.fromCubemap(c),M.texture.pmremVersion=c.pmremVersion,n.set(c,M),c.addEventListener("dispose",o),M.texture):null}}}return c}function s(c){let b=0;const E=6;for(let L=0;L<E;L++)c[L]!==void 0&&b++;return b===E}function o(c){const b=c.target;b.removeEventListener("dispose",o);const E=n.get(b);E!==void 0&&(n.delete(b),E.dispose())}function u(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:u}}function _c(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return n[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&pn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function mc(e,n,t,i){const s={},o=new WeakMap;function u(M){const v=M.target;v.index!==null&&n.remove(v.index);for(const N in v.attributes)n.remove(v.attributes[N]);v.removeEventListener("dispose",u),delete s[v.id];const x=o.get(v);x&&(n.remove(x),o.delete(v)),i.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,t.memory.geometries--}function c(M,v){return s[v.id]===!0||(v.addEventListener("dispose",u),s[v.id]=!0,t.memory.geometries++),v}function b(M){const v=M.attributes;for(const x in v)n.update(v[x],e.ARRAY_BUFFER)}function E(M){const v=[],x=M.index,N=M.attributes.position;let D=0;if(x!==null){const U=x.array;D=x.version;for(let A=0,m=U.length;A<m;A+=3){const G=U[A+0],P=U[A+1],I=U[A+2];v.push(G,P,P,I,I,G)}}else if(N!==void 0){const U=N.array;D=N.version;for(let A=0,m=U.length/3-1;A<m;A+=3){const G=A+0,P=A+1,I=A+2;v.push(G,P,P,I,I,G)}}else return;const f=new(Qr(v)?$r:jr)(v,1);f.version=D;const a=o.get(M);a&&n.remove(a),o.set(M,f)}function L(M){const v=o.get(M);if(v){const x=M.index;x!==null&&v.version<x.version&&E(M)}else E(M);return o.get(M)}return{get:c,update:b,getWireframeAttribute:L}}function gc(e,n,t){let i;function s(v){i=v}let o,u;function c(v){o=v.type,u=v.bytesPerElement}function b(v,x){e.drawElements(i,x,o,v*u),t.update(x,i,1)}function E(v,x,N){N!==0&&(e.drawElementsInstanced(i,x,o,v*u,N),t.update(x,i,N))}function L(v,x,N){if(N===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,x,0,o,v,0,N);let f=0;for(let a=0;a<N;a++)f+=x[a];t.update(f,i,1)}function M(v,x,N,D){if(N===0)return;const f=n.get("WEBGL_multi_draw");if(f===null)for(let a=0;a<v.length;a++)E(v[a]/u,x[a],D[a]);else{f.multiDrawElementsInstancedWEBGL(i,x,0,o,v,0,D,0,N);let a=0;for(let U=0;U<N;U++)a+=x[U]*D[U];t.update(a,i,1)}}this.setMode=s,this.setIndex=c,this.render=b,this.renderInstances=E,this.renderMultiDraw=L,this.renderMultiDrawInstances=M}function vc(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,u,c){switch(t.calls++,u){case e.TRIANGLES:t.triangles+=c*(o/3);break;case e.LINES:t.lines+=c*(o/2);break;case e.LINE_STRIP:t.lines+=c*(o-1);break;case e.LINE_LOOP:t.lines+=c*o;break;case e.POINTS:t.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Ec(e,n,t){const i=new WeakMap,s=new _t;function o(u,c,b){const E=u.morphTargetInfluences,L=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,M=L!==void 0?L.length:0;let v=i.get(c);if(v===void 0||v.count!==M){let h=function(){I.dispose(),i.delete(c),c.removeEventListener("dispose",h)};v!==void 0&&v.texture.dispose();const x=c.morphAttributes.position!==void 0,N=c.morphAttributes.normal!==void 0,D=c.morphAttributes.color!==void 0,f=c.morphAttributes.position||[],a=c.morphAttributes.normal||[],U=c.morphAttributes.color||[];let A=0;x===!0&&(A=1),N===!0&&(A=2),D===!0&&(A=3);let m=c.attributes.position.count*A,G=1;m>n.maxTextureSize&&(G=Math.ceil(m/n.maxTextureSize),m=n.maxTextureSize);const P=new Float32Array(m*G*4*M),I=new Ua(P,m,G,M);I.type=It,I.needsUpdate=!0;const H=A*4;for(let d=0;d<M;d++){const R=f[d],K=a[d],V=U[d],Y=m*G*4*d;for(let Q=0;Q<R.count;Q++){const W=Q*H;x===!0&&(s.fromBufferAttribute(R,Q),P[Y+W+0]=s.x,P[Y+W+1]=s.y,P[Y+W+2]=s.z,P[Y+W+3]=0),N===!0&&(s.fromBufferAttribute(K,Q),P[Y+W+4]=s.x,P[Y+W+5]=s.y,P[Y+W+6]=s.z,P[Y+W+7]=0),D===!0&&(s.fromBufferAttribute(V,Q),P[Y+W+8]=s.x,P[Y+W+9]=s.y,P[Y+W+10]=s.z,P[Y+W+11]=V.itemSize===4?s.w:1)}}v={count:M,texture:I,size:new $e(m,G)},i.set(c,v),c.addEventListener("dispose",h)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)b.getUniforms().setValue(e,"morphTexture",u.morphTexture,t);else{let x=0;for(let D=0;D<E.length;D++)x+=E[D];const N=c.morphTargetsRelative?1:1-x;b.getUniforms().setValue(e,"morphTargetBaseInfluence",N),b.getUniforms().setValue(e,"morphTargetInfluences",E)}b.getUniforms().setValue(e,"morphTargetsTexture",v.texture,t),b.getUniforms().setValue(e,"morphTargetsTextureSize",v.size)}return{update:o}}function Sc(e,n,t,i){let s=new WeakMap;function o(b){const E=i.render.frame,L=b.geometry,M=n.get(b,L);if(s.get(M)!==E&&(n.update(M),s.set(M,E)),b.isInstancedMesh&&(b.hasEventListener("dispose",c)===!1&&b.addEventListener("dispose",c),s.get(b)!==E&&(t.update(b.instanceMatrix,e.ARRAY_BUFFER),b.instanceColor!==null&&t.update(b.instanceColor,e.ARRAY_BUFFER),s.set(b,E))),b.isSkinnedMesh){const v=b.skeleton;s.get(v)!==E&&(v.update(),s.set(v,E))}return M}function u(){s=new WeakMap}function c(b){const E=b.target;E.removeEventListener("dispose",c),t.remove(E.instanceMatrix),E.instanceColor!==null&&t.remove(E.instanceColor)}return{update:o,dispose:u}}const Oa=new Ra,ji=new va(1,1),Fa=new Ua,Ba=new co,Ha=new lo,Qi=[],Ji=[],ea=new Float32Array(16),ta=new Float32Array(9),na=new Float32Array(4);function Zt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const s=n*t;let o=Qi[s];if(o===void 0&&(o=new Float32Array(s),Qi[s]=o),n!==0){i.toArray(o,0);for(let u=1,c=0;u!==n;++u)c+=t,e[u].toArray(o,c)}return o}function st(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function lt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function An(e,n){let t=Ji[n];t===void 0&&(t=new Int32Array(n),Ji[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Mc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Tc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2fv(this.addr,n),lt(t,n)}}function xc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(st(t,n))return;e.uniform3fv(this.addr,n),lt(t,n)}}function Ac(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4fv(this.addr,n),lt(t,n)}}function Rc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;na.set(i),e.uniformMatrix2fv(this.addr,!1,na),lt(t,i)}}function bc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;ta.set(i),e.uniformMatrix3fv(this.addr,!1,ta),lt(t,i)}}function Cc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;ea.set(i),e.uniformMatrix4fv(this.addr,!1,ea),lt(t,i)}}function Pc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Dc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2iv(this.addr,n),lt(t,n)}}function Lc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3iv(this.addr,n),lt(t,n)}}function Uc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4iv(this.addr,n),lt(t,n)}}function wc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function yc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2uiv(this.addr,n),lt(t,n)}}function Ic(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3uiv(this.addr,n),lt(t,n)}}function Nc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4uiv(this.addr,n),lt(t,n)}}function Oc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let o;this.type===e.SAMPLER_2D_SHADOW?(ji.compareFunction=Sa,o=ji):o=Oa,t.setTexture2D(n||o,s)}function Fc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(n||Ba,s)}function Bc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(n||Ha,s)}function Hc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(n||Fa,s)}function Gc(e){switch(e){case 5126:return Mc;case 35664:return Tc;case 35665:return xc;case 35666:return Ac;case 35674:return Rc;case 35675:return bc;case 35676:return Cc;case 5124:case 35670:return Pc;case 35667:case 35671:return Dc;case 35668:case 35672:return Lc;case 35669:case 35673:return Uc;case 5125:return wc;case 36294:return yc;case 36295:return Ic;case 36296:return Nc;case 35678:case 36198:case 36298:case 36306:case 35682:return Oc;case 35679:case 36299:case 36307:return Fc;case 35680:case 36300:case 36308:case 36293:return Bc;case 36289:case 36303:case 36311:case 36292:return Hc}}function Vc(e,n){e.uniform1fv(this.addr,n)}function kc(e,n){const t=Zt(n,this.size,2);e.uniform2fv(this.addr,t)}function zc(e,n){const t=Zt(n,this.size,3);e.uniform3fv(this.addr,t)}function Wc(e,n){const t=Zt(n,this.size,4);e.uniform4fv(this.addr,t)}function Xc(e,n){const t=Zt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Yc(e,n){const t=Zt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function Kc(e,n){const t=Zt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function qc(e,n){e.uniform1iv(this.addr,n)}function Zc(e,n){e.uniform2iv(this.addr,n)}function $c(e,n){e.uniform3iv(this.addr,n)}function jc(e,n){e.uniform4iv(this.addr,n)}function Qc(e,n){e.uniform1uiv(this.addr,n)}function Jc(e,n){e.uniform2uiv(this.addr,n)}function ef(e,n){e.uniform3uiv(this.addr,n)}function tf(e,n){e.uniform4uiv(this.addr,n)}function nf(e,n,t){const i=this.cache,s=n.length,o=An(t,s);st(i,o)||(e.uniform1iv(this.addr,o),lt(i,o));for(let u=0;u!==s;++u)t.setTexture2D(n[u]||Oa,o[u])}function af(e,n,t){const i=this.cache,s=n.length,o=An(t,s);st(i,o)||(e.uniform1iv(this.addr,o),lt(i,o));for(let u=0;u!==s;++u)t.setTexture3D(n[u]||Ba,o[u])}function rf(e,n,t){const i=this.cache,s=n.length,o=An(t,s);st(i,o)||(e.uniform1iv(this.addr,o),lt(i,o));for(let u=0;u!==s;++u)t.setTextureCube(n[u]||Ha,o[u])}function of(e,n,t){const i=this.cache,s=n.length,o=An(t,s);st(i,o)||(e.uniform1iv(this.addr,o),lt(i,o));for(let u=0;u!==s;++u)t.setTexture2DArray(n[u]||Fa,o[u])}function sf(e){switch(e){case 5126:return Vc;case 35664:return kc;case 35665:return zc;case 35666:return Wc;case 35674:return Xc;case 35675:return Yc;case 35676:return Kc;case 5124:case 35670:return qc;case 35667:case 35671:return Zc;case 35668:case 35672:return $c;case 35669:case 35673:return jc;case 5125:return Qc;case 36294:return Jc;case 36295:return ef;case 36296:return tf;case 35678:case 36198:case 36298:case 36306:case 35682:return nf;case 35679:case 36299:case 36307:return af;case 35680:case 36300:case 36308:case 36293:return rf;case 36289:case 36303:case 36311:case 36292:return of}}class lf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Gc(t.type)}}class cf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sf(t.type)}}class ff{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const s=this.seq;for(let o=0,u=s.length;o!==u;++o){const c=s[o];c.setValue(n,t[c.id],i)}}}const Hn=/(\w+)(\])?(\[|\.)?/g;function ia(e,n){e.seq.push(n),e.map[n.id]=n}function df(e,n,t){const i=e.name,s=i.length;for(Hn.lastIndex=0;;){const o=Hn.exec(i),u=Hn.lastIndex;let c=o[1];const b=o[2]==="]",E=o[3];if(b&&(c=c|0),E===void 0||E==="["&&u+2===s){ia(t,E===void 0?new lf(c,e,n):new cf(c,e,n));break}else{let M=t.map[c];M===void 0&&(M=new ff(c),ia(t,M)),t=M}}}class gn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=n.getActiveUniform(t,s),u=n.getUniformLocation(t,o.name);df(o,u,this)}}setValue(n,t,i,s){const o=this.map[t];o!==void 0&&o.setValue(n,i,s)}setOptional(n,t,i){const s=t[i];s!==void 0&&this.setValue(n,i,s)}static upload(n,t,i,s){for(let o=0,u=t.length;o!==u;++o){const c=t[o],b=i[c.id];b.needsUpdate!==!1&&c.setValue(n,b.value,s)}}static seqWithValue(n,t){const i=[];for(let s=0,o=n.length;s!==o;++s){const u=n[s];u.id in t&&i.push(u)}return i}}function aa(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const uf=37297;let pf=0;function hf(e,n){const t=e.split(`
`),i=[],s=Math.max(n-6,0),o=Math.min(n+6,t.length);for(let u=s;u<o;u++){const c=u+1;i.push(`${c===n?">":" "} ${c}: ${t[u]}`)}return i.join(`
`)}const ra=new Fe;function _f(e){at._getMatrix(ra,at.workingColorSpace,e);const n=`mat3( ${ra.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(e)){case Ia:return[n,"LinearTransferOETF"];case Ze:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function oa(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),s=e.getShaderInfoLog(n).trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const u=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+hf(e.getShaderSource(n),u)}else return s}function mf(e,n){const t=_f(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function gf(e,n){let t;switch(n){case so:t="Linear";break;case oo:t="Reinhard";break;case ro:t="Cineon";break;case ao:t="ACESFilmic";break;case io:t="AgX";break;case no:t="Neutral";break;case to:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const dn=new ye;function vf(){at.getLuminanceCoefficients(dn);const e=dn.x.toFixed(4),n=dn.y.toFixed(4),t=dn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ef(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jt).join(`
`)}function Sf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Mf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const o=e.getActiveAttrib(n,s),u=o.name;let c=1;o.type===e.FLOAT_MAT2&&(c=2),o.type===e.FLOAT_MAT3&&(c=3),o.type===e.FLOAT_MAT4&&(c=4),t[u]={type:o.type,location:e.getAttribLocation(n,u),locationSize:c}}return t}function Jt(e){return e!==""}function sa(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function la(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Tf=/^[ \t]*#include +<([\w\d./]+)>/gm;function $n(e){return e.replace(Tf,Af)}const xf=new Map;function Af(e,n){let t=Ue[n];if(t===void 0){const i=xf.get(n);if(i!==void 0)t=Ue[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return $n(t)}const Rf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ca(e){return e.replace(Rf,bf)}function bf(e,n,t,i){let s="";for(let o=parseInt(n);o<parseInt(t);o++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function fa(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}function Cf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Ta?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===eo?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===At&&(n="SHADOWMAP_TYPE_VSM"),n}function Pf(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case nn:case qt:n="ENVMAP_TYPE_CUBE";break;case xn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Df(e){let n="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case qt:n="ENVMAP_MODE_REFRACTION";break}return n}function Lf(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case ho:n="ENVMAP_BLENDING_MULTIPLY";break;case po:n="ENVMAP_BLENDING_MIX";break;case uo:n="ENVMAP_BLENDING_ADD";break}return n}function Uf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function wf(e,n,t,i){const s=e.getContext(),o=t.defines;let u=t.vertexShader,c=t.fragmentShader;const b=Cf(t),E=Pf(t),L=Df(t),M=Lf(t),v=Uf(t),x=Ef(t),N=Sf(o),D=s.createProgram();let f,a,U=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(Jt).join(`
`),f.length>0&&(f+=`
`),a=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(Jt).join(`
`),a.length>0&&(a+=`
`)):(f=[fa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+L:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+b:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jt).join(`
`),a=[fa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+E:"",t.envMap?"#define "+L:"",t.envMap?"#define "+M:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+b:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ct?"#define TONE_MAPPING":"",t.toneMapping!==Ct?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Ct?gf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,mf("linearToOutputTexel",t.outputColorSpace),vf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Jt).join(`
`)),u=$n(u),u=sa(u,t),u=la(u,t),c=$n(c),c=sa(c,t),c=la(c,t),u=ca(u),c=ca(c),t.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,f=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,a=["#define varying in",t.glslVersion===Gi?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+a);const A=U+f+u,m=U+a+c,G=aa(s,s.VERTEX_SHADER,A),P=aa(s,s.FRAGMENT_SHADER,m);s.attachShader(D,G),s.attachShader(D,P),t.index0AttributeName!==void 0?s.bindAttribLocation(D,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(D,0,"position"),s.linkProgram(D);function I(R){if(e.debug.checkShaderErrors){const K=s.getProgramInfoLog(D).trim(),V=s.getShaderInfoLog(G).trim(),Y=s.getShaderInfoLog(P).trim();let Q=!0,W=!0;if(s.getProgramParameter(D,s.LINK_STATUS)===!1)if(Q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,D,G,P);else{const ee=oa(s,G,"vertex"),F=oa(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(D,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+K+`
`+ee+`
`+F)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(V===""||Y==="")&&(W=!1);W&&(R.diagnostics={runnable:Q,programLog:K,vertexShader:{log:V,prefix:f},fragmentShader:{log:Y,prefix:a}})}s.deleteShader(G),s.deleteShader(P),H=new gn(s,D),h=Mf(s,D)}let H;this.getUniforms=function(){return H===void 0&&I(this),H};let h;this.getAttributes=function(){return h===void 0&&I(this),h};let d=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return d===!1&&(d=s.getProgramParameter(D,uf)),d},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(D),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=pf++,this.cacheKey=n,this.usedTimes=1,this.program=D,this.vertexShader=G,this.fragmentShader=P,this}let yf=0;class If{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,s=this._getShaderStage(t),o=this._getShaderStage(i),u=this._getShaderCacheForMaterial(n);return u.has(s)===!1&&(u.add(s),s.usedTimes++),u.has(o)===!1&&(u.add(o),o.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Nf(n),t.set(n,i)),i}}class Nf{constructor(n){this.id=yf++,this.code=n,this.usedTimes=0}}function Of(e,n,t,i,s,o,u){const c=new Jr,b=new If,E=new Set,L=[],M=s.logarithmicDepthBuffer,v=s.vertexTextures;let x=s.precision;const N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function D(h){return E.add(h),h===0?"uv":`uv${h}`}function f(h,d,R,K,V){const Y=K.fog,Q=V.geometry,W=h.isMeshStandardMaterial?K.environment:null,ee=(h.isMeshStandardMaterial?t:n).get(h.envMap||W),F=ee&&ee.mapping===xn?ee.image.height:null,ve=N[h.type];h.precision!==null&&(x=s.getMaxPrecision(h.precision),x!==h.precision&&console.warn("THREE.WebGLProgram.getParameters:",h.precision,"not supported, using",x,"instead."));const Ae=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,we=Ae!==void 0?Ae.length:0;let Ve=0;Q.morphAttributes.position!==void 0&&(Ve=1),Q.morphAttributes.normal!==void 0&&(Ve=2),Q.morphAttributes.color!==void 0&&(Ve=3);let nt,k,J,me;if(ve){const ke=Tt[ve];nt=ke.vertexShader,k=ke.fragmentShader}else nt=h.vertexShader,k=h.fragmentShader,b.update(h),J=b.getVertexShaderID(h),me=b.getFragmentShaderID(h);const oe=e.getRenderTarget(),ge=e.state.buffers.depth.getReversed(),Be=V.isInstancedMesh===!0,Re=V.isBatchedMesh===!0,Je=!!h.map,et=!!h.matcap,He=!!ee,_=!!h.aoMap,ct=!!h.lightMap,Ge=!!h.bumpMap,Ye=!!h.normalMap,pe=!!h.displacementMap,Ne=!!h.emissiveMap,Se=!!h.metalnessMap,Le=!!h.roughnessMap,rt=h.anisotropy>0,p=h.clearcoat>0,r=h.dispersion>0,C=h.iridescence>0,B=h.sheen>0,X=h.transmission>0,O=rt&&!!h.anisotropyMap,he=p&&!!h.clearcoatMap,ie=p&&!!h.clearcoatNormalMap,ue=p&&!!h.clearcoatRoughnessMap,_e=C&&!!h.iridescenceMap,q=C&&!!h.iridescenceThicknessMap,se=B&&!!h.sheenColorMap,xe=B&&!!h.sheenRoughnessMap,Te=!!h.specularMap,te=!!h.specularColorMap,Pe=!!h.specularIntensityMap,g=X&&!!h.transmissionMap,ae=X&&!!h.thicknessMap,Z=!!h.gradientMap,ce=!!h.alphaMap,$=h.alphaTest>0,z=!!h.alphaHash,fe=!!h.extensions;let De=Ct;h.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(De=e.toneMapping);const Ke={shaderID:ve,shaderType:h.type,shaderName:h.name,vertexShader:nt,fragmentShader:k,defines:h.defines,customVertexShaderID:J,customFragmentShaderID:me,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:x,batching:Re,batchingColor:Re&&V._colorsTexture!==null,instancing:Be,instancingColor:Be&&V.instanceColor!==null,instancingMorph:Be&&V.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:oe===null?e.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Tn,alphaToCoverage:!!h.alphaToCoverage,map:Je,matcap:et,envMap:He,envMapMode:He&&ee.mapping,envMapCubeUVHeight:F,aoMap:_,lightMap:ct,bumpMap:Ge,normalMap:Ye,displacementMap:v&&pe,emissiveMap:Ne,normalMapObjectSpace:Ye&&h.normalMapType===Zr,normalMapTangentSpace:Ye&&h.normalMapType===qr,metalnessMap:Se,roughnessMap:Le,anisotropy:rt,anisotropyMap:O,clearcoat:p,clearcoatMap:he,clearcoatNormalMap:ie,clearcoatRoughnessMap:ue,dispersion:r,iridescence:C,iridescenceMap:_e,iridescenceThicknessMap:q,sheen:B,sheenColorMap:se,sheenRoughnessMap:xe,specularMap:Te,specularColorMap:te,specularIntensityMap:Pe,transmission:X,transmissionMap:g,thicknessMap:ae,gradientMap:Z,opaque:h.transparent===!1&&h.blending===mn&&h.alphaToCoverage===!1,alphaMap:ce,alphaTest:$,alphaHash:z,combine:h.combine,mapUv:Je&&D(h.map.channel),aoMapUv:_&&D(h.aoMap.channel),lightMapUv:ct&&D(h.lightMap.channel),bumpMapUv:Ge&&D(h.bumpMap.channel),normalMapUv:Ye&&D(h.normalMap.channel),displacementMapUv:pe&&D(h.displacementMap.channel),emissiveMapUv:Ne&&D(h.emissiveMap.channel),metalnessMapUv:Se&&D(h.metalnessMap.channel),roughnessMapUv:Le&&D(h.roughnessMap.channel),anisotropyMapUv:O&&D(h.anisotropyMap.channel),clearcoatMapUv:he&&D(h.clearcoatMap.channel),clearcoatNormalMapUv:ie&&D(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&D(h.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&D(h.iridescenceMap.channel),iridescenceThicknessMapUv:q&&D(h.iridescenceThicknessMap.channel),sheenColorMapUv:se&&D(h.sheenColorMap.channel),sheenRoughnessMapUv:xe&&D(h.sheenRoughnessMap.channel),specularMapUv:Te&&D(h.specularMap.channel),specularColorMapUv:te&&D(h.specularColorMap.channel),specularIntensityMapUv:Pe&&D(h.specularIntensityMap.channel),transmissionMapUv:g&&D(h.transmissionMap.channel),thicknessMapUv:ae&&D(h.thicknessMap.channel),alphaMapUv:ce&&D(h.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Ye||rt),vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Q.attributes.uv&&(Je||ce),fog:!!Y,useFog:h.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:h.flatShading===!0&&h.wireframe===!1,sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:M,reverseDepthBuffer:ge,skinning:V.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Ve,numDirLights:d.directional.length,numPointLights:d.point.length,numSpotLights:d.spot.length,numSpotLightMaps:d.spotLightMap.length,numRectAreaLights:d.rectArea.length,numHemiLights:d.hemi.length,numDirLightShadows:d.directionalShadowMap.length,numPointLightShadows:d.pointShadowMap.length,numSpotLightShadows:d.spotShadowMap.length,numSpotLightShadowsWithMaps:d.numSpotLightShadowsWithMaps,numLightProbes:d.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:h.dithering,shadowMapEnabled:e.shadowMap.enabled&&R.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:Je&&h.map.isVideoTexture===!0&&at.getTransfer(h.map.colorSpace)===Ze,decodeVideoTextureEmissive:Ne&&h.emissiveMap.isVideoTexture===!0&&at.getTransfer(h.emissiveMap.colorSpace)===Ze,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===Rt,flipSided:h.side===vt,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:fe&&h.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&h.extensions.multiDraw===!0||Re)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return Ke.vertexUv1s=E.has(1),Ke.vertexUv2s=E.has(2),Ke.vertexUv3s=E.has(3),E.clear(),Ke}function a(h){const d=[];if(h.shaderID?d.push(h.shaderID):(d.push(h.customVertexShaderID),d.push(h.customFragmentShaderID)),h.defines!==void 0)for(const R in h.defines)d.push(R),d.push(h.defines[R]);return h.isRawShaderMaterial===!1&&(U(d,h),A(d,h),d.push(e.outputColorSpace)),d.push(h.customProgramCacheKey),d.join()}function U(h,d){h.push(d.precision),h.push(d.outputColorSpace),h.push(d.envMapMode),h.push(d.envMapCubeUVHeight),h.push(d.mapUv),h.push(d.alphaMapUv),h.push(d.lightMapUv),h.push(d.aoMapUv),h.push(d.bumpMapUv),h.push(d.normalMapUv),h.push(d.displacementMapUv),h.push(d.emissiveMapUv),h.push(d.metalnessMapUv),h.push(d.roughnessMapUv),h.push(d.anisotropyMapUv),h.push(d.clearcoatMapUv),h.push(d.clearcoatNormalMapUv),h.push(d.clearcoatRoughnessMapUv),h.push(d.iridescenceMapUv),h.push(d.iridescenceThicknessMapUv),h.push(d.sheenColorMapUv),h.push(d.sheenRoughnessMapUv),h.push(d.specularMapUv),h.push(d.specularColorMapUv),h.push(d.specularIntensityMapUv),h.push(d.transmissionMapUv),h.push(d.thicknessMapUv),h.push(d.combine),h.push(d.fogExp2),h.push(d.sizeAttenuation),h.push(d.morphTargetsCount),h.push(d.morphAttributeCount),h.push(d.numDirLights),h.push(d.numPointLights),h.push(d.numSpotLights),h.push(d.numSpotLightMaps),h.push(d.numHemiLights),h.push(d.numRectAreaLights),h.push(d.numDirLightShadows),h.push(d.numPointLightShadows),h.push(d.numSpotLightShadows),h.push(d.numSpotLightShadowsWithMaps),h.push(d.numLightProbes),h.push(d.shadowMapType),h.push(d.toneMapping),h.push(d.numClippingPlanes),h.push(d.numClipIntersection),h.push(d.depthPacking)}function A(h,d){c.disableAll(),d.supportsVertexTextures&&c.enable(0),d.instancing&&c.enable(1),d.instancingColor&&c.enable(2),d.instancingMorph&&c.enable(3),d.matcap&&c.enable(4),d.envMap&&c.enable(5),d.normalMapObjectSpace&&c.enable(6),d.normalMapTangentSpace&&c.enable(7),d.clearcoat&&c.enable(8),d.iridescence&&c.enable(9),d.alphaTest&&c.enable(10),d.vertexColors&&c.enable(11),d.vertexAlphas&&c.enable(12),d.vertexUv1s&&c.enable(13),d.vertexUv2s&&c.enable(14),d.vertexUv3s&&c.enable(15),d.vertexTangents&&c.enable(16),d.anisotropy&&c.enable(17),d.alphaHash&&c.enable(18),d.batching&&c.enable(19),d.dispersion&&c.enable(20),d.batchingColor&&c.enable(21),d.gradientMap&&c.enable(22),h.push(c.mask),c.disableAll(),d.fog&&c.enable(0),d.useFog&&c.enable(1),d.flatShading&&c.enable(2),d.logarithmicDepthBuffer&&c.enable(3),d.reverseDepthBuffer&&c.enable(4),d.skinning&&c.enable(5),d.morphTargets&&c.enable(6),d.morphNormals&&c.enable(7),d.morphColors&&c.enable(8),d.premultipliedAlpha&&c.enable(9),d.shadowMapEnabled&&c.enable(10),d.doubleSided&&c.enable(11),d.flipSided&&c.enable(12),d.useDepthPacking&&c.enable(13),d.dithering&&c.enable(14),d.transmission&&c.enable(15),d.sheen&&c.enable(16),d.opaque&&c.enable(17),d.pointsUvs&&c.enable(18),d.decodeVideoTexture&&c.enable(19),d.decodeVideoTextureEmissive&&c.enable(20),d.alphaToCoverage&&c.enable(21),h.push(c.mask)}function m(h){const d=N[h.type];let R;if(d){const K=Tt[d];R=Kr.clone(K.uniforms)}else R=h.uniforms;return R}function G(h,d){let R;for(let K=0,V=L.length;K<V;K++){const Y=L[K];if(Y.cacheKey===d){R=Y,++R.usedTimes;break}}return R===void 0&&(R=new wf(e,d,h,o),L.push(R)),R}function P(h){if(--h.usedTimes===0){const d=L.indexOf(h);L[d]=L[L.length-1],L.pop(),h.destroy()}}function I(h){b.remove(h)}function H(){b.dispose()}return{getParameters:f,getProgramCacheKey:a,getUniforms:m,acquireProgram:G,releaseProgram:P,releaseShaderCache:I,programs:L,dispose:H}}function Ff(){let e=new WeakMap;function n(u){return e.has(u)}function t(u){let c=e.get(u);return c===void 0&&(c={},e.set(u,c)),c}function i(u){e.delete(u)}function s(u,c,b){e.get(u)[c]=b}function o(){e=new WeakMap}return{has:n,get:t,remove:i,update:s,dispose:o}}function Bf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function da(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function ua(){const e=[];let n=0;const t=[],i=[],s=[];function o(){n=0,t.length=0,i.length=0,s.length=0}function u(M,v,x,N,D,f){let a=e[n];return a===void 0?(a={id:M.id,object:M,geometry:v,material:x,groupOrder:N,renderOrder:M.renderOrder,z:D,group:f},e[n]=a):(a.id=M.id,a.object=M,a.geometry=v,a.material=x,a.groupOrder=N,a.renderOrder=M.renderOrder,a.z=D,a.group=f),n++,a}function c(M,v,x,N,D,f){const a=u(M,v,x,N,D,f);x.transmission>0?i.push(a):x.transparent===!0?s.push(a):t.push(a)}function b(M,v,x,N,D,f){const a=u(M,v,x,N,D,f);x.transmission>0?i.unshift(a):x.transparent===!0?s.unshift(a):t.unshift(a)}function E(M,v){t.length>1&&t.sort(M||Bf),i.length>1&&i.sort(v||da),s.length>1&&s.sort(v||da)}function L(){for(let M=n,v=e.length;M<v;M++){const x=e[M];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:o,push:c,unshift:b,finish:L,sort:E}}function Hf(){let e=new WeakMap;function n(i,s){const o=e.get(i);let u;return o===void 0?(u=new ua,e.set(i,[u])):s>=o.length?(u=new ua,o.push(u)):u=o[s],u}function t(){e=new WeakMap}return{get:n,dispose:t}}function Gf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new ye,color:new Qe};break;case"SpotLight":t={position:new ye,direction:new ye,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ye,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ye,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new ye,halfWidth:new ye,halfHeight:new ye};break}return e[n.id]=t,t}}}function Vf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let kf=0;function zf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Wf(e){const n=new Gf,t=Vf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let E=0;E<9;E++)i.probe.push(new ye);const s=new ye,o=new Yt,u=new Yt;function c(E){let L=0,M=0,v=0;for(let h=0;h<9;h++)i.probe[h].set(0,0,0);let x=0,N=0,D=0,f=0,a=0,U=0,A=0,m=0,G=0,P=0,I=0;E.sort(zf);for(let h=0,d=E.length;h<d;h++){const R=E[h],K=R.color,V=R.intensity,Y=R.distance,Q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)L+=K.r*V,M+=K.g*V,v+=K.b*V;else if(R.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(R.sh.coefficients[W],V);I++}else if(R.isDirectionalLight){const W=n.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const ee=R.shadow,F=t.get(R);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,i.directionalShadow[x]=F,i.directionalShadowMap[x]=Q,i.directionalShadowMatrix[x]=R.shadow.matrix,U++}i.directional[x]=W,x++}else if(R.isSpotLight){const W=n.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(K).multiplyScalar(V),W.distance=Y,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,i.spot[D]=W;const ee=R.shadow;if(R.map&&(i.spotLightMap[G]=R.map,G++,ee.updateMatrices(R),R.castShadow&&P++),i.spotLightMatrix[D]=ee.matrix,R.castShadow){const F=t.get(R);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,i.spotShadow[D]=F,i.spotShadowMap[D]=Q,m++}D++}else if(R.isRectAreaLight){const W=n.get(R);W.color.copy(K).multiplyScalar(V),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),i.rectArea[f]=W,f++}else if(R.isPointLight){const W=n.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const ee=R.shadow,F=t.get(R);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,F.shadowCameraNear=ee.camera.near,F.shadowCameraFar=ee.camera.far,i.pointShadow[N]=F,i.pointShadowMap[N]=Q,i.pointShadowMatrix[N]=R.shadow.matrix,A++}i.point[N]=W,N++}else if(R.isHemisphereLight){const W=n.get(R);W.skyColor.copy(R.color).multiplyScalar(V),W.groundColor.copy(R.groundColor).multiplyScalar(V),i.hemi[a]=W,a++}}f>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ne.LTC_FLOAT_1,i.rectAreaLTC2=ne.LTC_FLOAT_2):(i.rectAreaLTC1=ne.LTC_HALF_1,i.rectAreaLTC2=ne.LTC_HALF_2)),i.ambient[0]=L,i.ambient[1]=M,i.ambient[2]=v;const H=i.hash;(H.directionalLength!==x||H.pointLength!==N||H.spotLength!==D||H.rectAreaLength!==f||H.hemiLength!==a||H.numDirectionalShadows!==U||H.numPointShadows!==A||H.numSpotShadows!==m||H.numSpotMaps!==G||H.numLightProbes!==I)&&(i.directional.length=x,i.spot.length=D,i.rectArea.length=f,i.point.length=N,i.hemi.length=a,i.directionalShadow.length=U,i.directionalShadowMap.length=U,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=m,i.spotShadowMap.length=m,i.directionalShadowMatrix.length=U,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=m+G-P,i.spotLightMap.length=G,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=I,H.directionalLength=x,H.pointLength=N,H.spotLength=D,H.rectAreaLength=f,H.hemiLength=a,H.numDirectionalShadows=U,H.numPointShadows=A,H.numSpotShadows=m,H.numSpotMaps=G,H.numLightProbes=I,i.version=kf++)}function b(E,L){let M=0,v=0,x=0,N=0,D=0;const f=L.matrixWorldInverse;for(let a=0,U=E.length;a<U;a++){const A=E[a];if(A.isDirectionalLight){const m=i.directional[M];m.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),m.direction.sub(s),m.direction.transformDirection(f),M++}else if(A.isSpotLight){const m=i.spot[x];m.position.setFromMatrixPosition(A.matrixWorld),m.position.applyMatrix4(f),m.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),m.direction.sub(s),m.direction.transformDirection(f),x++}else if(A.isRectAreaLight){const m=i.rectArea[N];m.position.setFromMatrixPosition(A.matrixWorld),m.position.applyMatrix4(f),u.identity(),o.copy(A.matrixWorld),o.premultiply(f),u.extractRotation(o),m.halfWidth.set(A.width*.5,0,0),m.halfHeight.set(0,A.height*.5,0),m.halfWidth.applyMatrix4(u),m.halfHeight.applyMatrix4(u),N++}else if(A.isPointLight){const m=i.point[v];m.position.setFromMatrixPosition(A.matrixWorld),m.position.applyMatrix4(f),v++}else if(A.isHemisphereLight){const m=i.hemi[D];m.direction.setFromMatrixPosition(A.matrixWorld),m.direction.transformDirection(f),D++}}}return{setup:c,setupView:b,state:i}}function pa(e){const n=new Wf(e),t=[],i=[];function s(L){E.camera=L,t.length=0,i.length=0}function o(L){t.push(L)}function u(L){i.push(L)}function c(){n.setup(t)}function b(L){n.setupView(t,L)}const E={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:s,state:E,setupLights:c,setupLightsView:b,pushLight:o,pushShadow:u}}function Xf(e){let n=new WeakMap;function t(s,o=0){const u=n.get(s);let c;return u===void 0?(c=new pa(e),n.set(s,[c])):o>=u.length?(c=new pa(e),u.push(c)):c=u[o],c}function i(){n=new WeakMap}return{get:t,dispose:i}}const Yf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qf(e,n,t){let i=new ma;const s=new $e,o=new $e,u=new _t,c=new wr({depthPacking:yr}),b=new Ir,E={},L=t.maxTextureSize,M={[tn]:vt,[vt]:tn,[Rt]:Rt},v=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:Yf,fragmentShader:Kf}),x=v.clone();x.defines.HORIZONTAL_PASS=1;const N=new Ea;N.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new dt(N,v),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ta;let a=this.type;this.render=function(P,I,H){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||P.length===0)return;const h=e.getRenderTarget(),d=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),K=e.state;K.setBlending(Nt),K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const V=a!==At&&this.type===At,Y=a===At&&this.type!==At;for(let Q=0,W=P.length;Q<W;Q++){const ee=P[Q],F=ee.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const ve=F.getFrameExtents();if(s.multiply(ve),o.copy(F.mapSize),(s.x>L||s.y>L)&&(s.x>L&&(o.x=Math.floor(L/ve.x),s.x=o.x*ve.x,F.mapSize.x=o.x),s.y>L&&(o.y=Math.floor(L/ve.y),s.y=o.y*ve.y,F.mapSize.y=o.y)),F.map===null||V===!0||Y===!0){const we=this.type!==At?{minFilter:en,magFilter:en}:{};F.map!==null&&F.map.dispose(),F.map=new Kt(s.x,s.y,we),F.map.texture.name=ee.name+".shadowMap",F.camera.updateProjectionMatrix()}e.setRenderTarget(F.map),e.clear();const Ae=F.getViewportCount();for(let we=0;we<Ae;we++){const Ve=F.getViewport(we);u.set(o.x*Ve.x,o.y*Ve.y,o.x*Ve.z,o.y*Ve.w),K.viewport(u),F.updateMatrices(ee,we),i=F.getFrustum(),m(I,H,F.camera,ee,this.type)}F.isPointLightShadow!==!0&&this.type===At&&U(F,H),F.needsUpdate=!1}a=this.type,f.needsUpdate=!1,e.setRenderTarget(h,d,R)};function U(P,I){const H=n.update(D);v.defines.VSM_SAMPLES!==P.blurSamples&&(v.defines.VSM_SAMPLES=P.blurSamples,x.defines.VSM_SAMPLES=P.blurSamples,v.needsUpdate=!0,x.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Kt(s.x,s.y)),v.uniforms.shadow_pass.value=P.map.texture,v.uniforms.resolution.value=P.mapSize,v.uniforms.radius.value=P.radius,e.setRenderTarget(P.mapPass),e.clear(),e.renderBufferDirect(I,null,H,v,D,null),x.uniforms.shadow_pass.value=P.mapPass.texture,x.uniforms.resolution.value=P.mapSize,x.uniforms.radius.value=P.radius,e.setRenderTarget(P.map),e.clear(),e.renderBufferDirect(I,null,H,x,D,null)}function A(P,I,H,h){let d=null;const R=H.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(R!==void 0)d=R;else if(d=H.isPointLight===!0?b:c,e.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const K=d.uuid,V=I.uuid;let Y=E[K];Y===void 0&&(Y={},E[K]=Y);let Q=Y[V];Q===void 0&&(Q=d.clone(),Y[V]=Q,I.addEventListener("dispose",G)),d=Q}if(d.visible=I.visible,d.wireframe=I.wireframe,h===At?d.side=I.shadowSide!==null?I.shadowSide:I.side:d.side=I.shadowSide!==null?I.shadowSide:M[I.side],d.alphaMap=I.alphaMap,d.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,d.map=I.map,d.clipShadows=I.clipShadows,d.clippingPlanes=I.clippingPlanes,d.clipIntersection=I.clipIntersection,d.displacementMap=I.displacementMap,d.displacementScale=I.displacementScale,d.displacementBias=I.displacementBias,d.wireframeLinewidth=I.wireframeLinewidth,d.linewidth=I.linewidth,H.isPointLight===!0&&d.isMeshDistanceMaterial===!0){const K=e.properties.get(d);K.light=H}return d}function m(P,I,H,h,d){if(P.visible===!1)return;if(P.layers.test(I.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&d===At)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,P.matrixWorld);const V=n.update(P),Y=P.material;if(Array.isArray(Y)){const Q=V.groups;for(let W=0,ee=Q.length;W<ee;W++){const F=Q[W],ve=Y[F.materialIndex];if(ve&&ve.visible){const Ae=A(P,ve,h,d);P.onBeforeShadow(e,P,I,H,V,Ae,F),e.renderBufferDirect(H,null,V,Ae,P,F),P.onAfterShadow(e,P,I,H,V,Ae,F)}}}else if(Y.visible){const Q=A(P,Y,h,d);P.onBeforeShadow(e,P,I,H,V,Q,null),e.renderBufferDirect(H,null,V,Q,P,null),P.onAfterShadow(e,P,I,H,V,Q,null)}}const K=P.children;for(let V=0,Y=K.length;V<Y;V++)m(K[V],I,H,h,d)}function G(P){P.target.removeEventListener("dispose",G);for(const H in E){const h=E[H],d=P.target.uuid;d in h&&(h[d].dispose(),delete h[d])}}}const Zf={[Kn]:Yn,[Xn]:kn,[Wn]:Vn,[En]:zn,[Yn]:Kn,[kn]:Xn,[Vn]:Wn,[zn]:En};function $f(e,n){function t(){let g=!1;const ae=new _t;let Z=null;const ce=new _t(0,0,0,0);return{setMask:function($){Z!==$&&!g&&(e.colorMask($,$,$,$),Z=$)},setLocked:function($){g=$},setClear:function($,z,fe,De,Ke){Ke===!0&&($*=De,z*=De,fe*=De),ae.set($,z,fe,De),ce.equals(ae)===!1&&(e.clearColor($,z,fe,De),ce.copy(ae))},reset:function(){g=!1,Z=null,ce.set(-1,0,0,0)}}}function i(){let g=!1,ae=!1,Z=null,ce=null,$=null;return{setReversed:function(z){if(ae!==z){const fe=n.get("EXT_clip_control");z?fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.ZERO_TO_ONE_EXT):fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.NEGATIVE_ONE_TO_ONE_EXT),ae=z;const De=$;$=null,this.setClear(De)}},getReversed:function(){return ae},setTest:function(z){z?oe(e.DEPTH_TEST):ge(e.DEPTH_TEST)},setMask:function(z){Z!==z&&!g&&(e.depthMask(z),Z=z)},setFunc:function(z){if(ae&&(z=Zf[z]),ce!==z){switch(z){case Kn:e.depthFunc(e.NEVER);break;case Yn:e.depthFunc(e.ALWAYS);break;case Xn:e.depthFunc(e.LESS);break;case En:e.depthFunc(e.LEQUAL);break;case Wn:e.depthFunc(e.EQUAL);break;case zn:e.depthFunc(e.GEQUAL);break;case kn:e.depthFunc(e.GREATER);break;case Vn:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ce=z}},setLocked:function(z){g=z},setClear:function(z){$!==z&&(ae&&(z=1-z),e.clearDepth(z),$=z)},reset:function(){g=!1,Z=null,ce=null,$=null,ae=!1}}}function s(){let g=!1,ae=null,Z=null,ce=null,$=null,z=null,fe=null,De=null,Ke=null;return{setTest:function(ke){g||(ke?oe(e.STENCIL_TEST):ge(e.STENCIL_TEST))},setMask:function(ke){ae!==ke&&!g&&(e.stencilMask(ke),ae=ke)},setFunc:function(ke,Mt,xt){(Z!==ke||ce!==Mt||$!==xt)&&(e.stencilFunc(ke,Mt,xt),Z=ke,ce=Mt,$=xt)},setOp:function(ke,Mt,xt){(z!==ke||fe!==Mt||De!==xt)&&(e.stencilOp(ke,Mt,xt),z=ke,fe=Mt,De=xt)},setLocked:function(ke){g=ke},setClear:function(ke){Ke!==ke&&(e.clearStencil(ke),Ke=ke)},reset:function(){g=!1,ae=null,Z=null,ce=null,$=null,z=null,fe=null,De=null,Ke=null}}}const o=new t,u=new i,c=new s,b=new WeakMap,E=new WeakMap;let L={},M={},v=new WeakMap,x=[],N=null,D=!1,f=null,a=null,U=null,A=null,m=null,G=null,P=null,I=new Qe(0,0,0),H=0,h=!1,d=null,R=null,K=null,V=null,Y=null;const Q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ee=0;const F=e.getParameter(e.VERSION);F.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(F)[1]),W=ee>=1):F.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),W=ee>=2);let ve=null,Ae={};const we=e.getParameter(e.SCISSOR_BOX),Ve=e.getParameter(e.VIEWPORT),nt=new _t().fromArray(we),k=new _t().fromArray(Ve);function J(g,ae,Z,ce){const $=new Uint8Array(4),z=e.createTexture();e.bindTexture(g,z),e.texParameteri(g,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(g,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let fe=0;fe<Z;fe++)g===e.TEXTURE_3D||g===e.TEXTURE_2D_ARRAY?e.texImage3D(ae,0,e.RGBA,1,1,ce,0,e.RGBA,e.UNSIGNED_BYTE,$):e.texImage2D(ae+fe,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,$);return z}const me={};me[e.TEXTURE_2D]=J(e.TEXTURE_2D,e.TEXTURE_2D,1),me[e.TEXTURE_CUBE_MAP]=J(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[e.TEXTURE_2D_ARRAY]=J(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),me[e.TEXTURE_3D]=J(e.TEXTURE_3D,e.TEXTURE_3D,1,1),o.setClear(0,0,0,1),u.setClear(1),c.setClear(0),oe(e.DEPTH_TEST),u.setFunc(En),Ge(!1),Ye(Ii),oe(e.CULL_FACE),_(Nt);function oe(g){L[g]!==!0&&(e.enable(g),L[g]=!0)}function ge(g){L[g]!==!1&&(e.disable(g),L[g]=!1)}function Be(g,ae){return M[g]!==ae?(e.bindFramebuffer(g,ae),M[g]=ae,g===e.DRAW_FRAMEBUFFER&&(M[e.FRAMEBUFFER]=ae),g===e.FRAMEBUFFER&&(M[e.DRAW_FRAMEBUFFER]=ae),!0):!1}function Re(g,ae){let Z=x,ce=!1;if(g){Z=v.get(ae),Z===void 0&&(Z=[],v.set(ae,Z));const $=g.textures;if(Z.length!==$.length||Z[0]!==e.COLOR_ATTACHMENT0){for(let z=0,fe=$.length;z<fe;z++)Z[z]=e.COLOR_ATTACHMENT0+z;Z.length=$.length,ce=!0}}else Z[0]!==e.BACK&&(Z[0]=e.BACK,ce=!0);ce&&e.drawBuffers(Z)}function Je(g){return N!==g?(e.useProgram(g),N=g,!0):!1}const et={[jt]:e.FUNC_ADD,[rr]:e.FUNC_SUBTRACT,[ar]:e.FUNC_REVERSE_SUBTRACT};et[_o]=e.MIN,et[mo]=e.MAX;const He={[Sr]:e.ZERO,[Er]:e.ONE,[vr]:e.SRC_COLOR,[gr]:e.SRC_ALPHA,[mr]:e.SRC_ALPHA_SATURATE,[_r]:e.DST_COLOR,[hr]:e.DST_ALPHA,[pr]:e.ONE_MINUS_SRC_COLOR,[ur]:e.ONE_MINUS_SRC_ALPHA,[dr]:e.ONE_MINUS_DST_COLOR,[fr]:e.ONE_MINUS_DST_ALPHA,[cr]:e.CONSTANT_COLOR,[lr]:e.ONE_MINUS_CONSTANT_COLOR,[sr]:e.CONSTANT_ALPHA,[or]:e.ONE_MINUS_CONSTANT_ALPHA};function _(g,ae,Z,ce,$,z,fe,De,Ke,ke){if(g===Nt){D===!0&&(ge(e.BLEND),D=!1);return}if(D===!1&&(oe(e.BLEND),D=!0),g!==Xr){if(g!==f||ke!==h){if((a!==jt||m!==jt)&&(e.blendEquation(e.FUNC_ADD),a=jt,m=jt),ke)switch(g){case mn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Fi:e.blendFunc(e.ONE,e.ONE);break;case Oi:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Ni:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",g);break}else switch(g){case mn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Fi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Oi:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ni:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",g);break}U=null,A=null,G=null,P=null,I.set(0,0,0),H=0,f=g,h=ke}return}$=$||ae,z=z||Z,fe=fe||ce,(ae!==a||$!==m)&&(e.blendEquationSeparate(et[ae],et[$]),a=ae,m=$),(Z!==U||ce!==A||z!==G||fe!==P)&&(e.blendFuncSeparate(He[Z],He[ce],He[z],He[fe]),U=Z,A=ce,G=z,P=fe),(De.equals(I)===!1||Ke!==H)&&(e.blendColor(De.r,De.g,De.b,Ke),I.copy(De),H=Ke),f=g,h=!1}function ct(g,ae){g.side===Rt?ge(e.CULL_FACE):oe(e.CULL_FACE);let Z=g.side===vt;ae&&(Z=!Z),Ge(Z),g.blending===mn&&g.transparent===!1?_(Nt):_(g.blending,g.blendEquation,g.blendSrc,g.blendDst,g.blendEquationAlpha,g.blendSrcAlpha,g.blendDstAlpha,g.blendColor,g.blendAlpha,g.premultipliedAlpha),u.setFunc(g.depthFunc),u.setTest(g.depthTest),u.setMask(g.depthWrite),o.setMask(g.colorWrite);const ce=g.stencilWrite;c.setTest(ce),ce&&(c.setMask(g.stencilWriteMask),c.setFunc(g.stencilFunc,g.stencilRef,g.stencilFuncMask),c.setOp(g.stencilFail,g.stencilZFail,g.stencilZPass)),Ne(g.polygonOffset,g.polygonOffsetFactor,g.polygonOffsetUnits),g.alphaToCoverage===!0?oe(e.SAMPLE_ALPHA_TO_COVERAGE):ge(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(g){d!==g&&(g?e.frontFace(e.CW):e.frontFace(e.CCW),d=g)}function Ye(g){g!==zr?(oe(e.CULL_FACE),g!==R&&(g===Ii?e.cullFace(e.BACK):g===Wr?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):ge(e.CULL_FACE),R=g}function pe(g){g!==K&&(W&&e.lineWidth(g),K=g)}function Ne(g,ae,Z){g?(oe(e.POLYGON_OFFSET_FILL),(V!==ae||Y!==Z)&&(e.polygonOffset(ae,Z),V=ae,Y=Z)):ge(e.POLYGON_OFFSET_FILL)}function Se(g){g?oe(e.SCISSOR_TEST):ge(e.SCISSOR_TEST)}function Le(g){g===void 0&&(g=e.TEXTURE0+Q-1),ve!==g&&(e.activeTexture(g),ve=g)}function rt(g,ae,Z){Z===void 0&&(ve===null?Z=e.TEXTURE0+Q-1:Z=ve);let ce=Ae[Z];ce===void 0&&(ce={type:void 0,texture:void 0},Ae[Z]=ce),(ce.type!==g||ce.texture!==ae)&&(ve!==Z&&(e.activeTexture(Z),ve=Z),e.bindTexture(g,ae||me[g]),ce.type=g,ce.texture=ae)}function p(){const g=Ae[ve];g!==void 0&&g.type!==void 0&&(e.bindTexture(g.type,null),g.type=void 0,g.texture=void 0)}function r(){try{e.compressedTexImage2D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function C(){try{e.compressedTexImage3D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function B(){try{e.texSubImage2D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function X(){try{e.texSubImage3D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function O(){try{e.compressedTexSubImage2D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function he(){try{e.compressedTexSubImage3D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function ie(){try{e.texStorage2D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function ue(){try{e.texStorage3D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function _e(){try{e.texImage2D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function q(){try{e.texImage3D(...arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function se(g){nt.equals(g)===!1&&(e.scissor(g.x,g.y,g.z,g.w),nt.copy(g))}function xe(g){k.equals(g)===!1&&(e.viewport(g.x,g.y,g.z,g.w),k.copy(g))}function Te(g,ae){let Z=E.get(ae);Z===void 0&&(Z=new WeakMap,E.set(ae,Z));let ce=Z.get(g);ce===void 0&&(ce=e.getUniformBlockIndex(ae,g.name),Z.set(g,ce))}function te(g,ae){const ce=E.get(ae).get(g);b.get(ae)!==ce&&(e.uniformBlockBinding(ae,ce,g.__bindingPointIndex),b.set(ae,ce))}function Pe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),u.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),L={},ve=null,Ae={},M={},v=new WeakMap,x=[],N=null,D=!1,f=null,a=null,U=null,A=null,m=null,G=null,P=null,I=new Qe(0,0,0),H=0,h=!1,d=null,R=null,K=null,V=null,Y=null,nt.set(0,0,e.canvas.width,e.canvas.height),k.set(0,0,e.canvas.width,e.canvas.height),o.reset(),u.reset(),c.reset()}return{buffers:{color:o,depth:u,stencil:c},enable:oe,disable:ge,bindFramebuffer:Be,drawBuffers:Re,useProgram:Je,setBlending:_,setMaterial:ct,setFlipSided:Ge,setCullFace:Ye,setLineWidth:pe,setPolygonOffset:Ne,setScissorTest:Se,activeTexture:Le,bindTexture:rt,unbindTexture:p,compressedTexImage2D:r,compressedTexImage3D:C,texImage2D:_e,texImage3D:q,updateUBOMapping:Te,uniformBlockBinding:te,texStorage2D:ie,texStorage3D:ue,texSubImage2D:B,texSubImage3D:X,compressedTexSubImage2D:O,compressedTexSubImage3D:he,scissor:se,viewport:xe,reset:Pe}}function jf(e,n,t,i,s,o,u){const c=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,b=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),E=new $e,L=new WeakMap;let M;const v=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(p,r){return x?new OffscreenCanvas(p,r):fo("canvas")}function D(p,r,C){let B=1;const X=rt(p);if((X.width>C||X.height>C)&&(B=C/Math.max(X.width,X.height)),B<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){const O=Math.floor(B*X.width),he=Math.floor(B*X.height);M===void 0&&(M=N(O,he));const ie=r?N(O,he):M;return ie.width=O,ie.height=he,ie.getContext("2d").drawImage(p,0,0,O,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+O+"x"+he+")."),ie}else return"data"in p&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),p;return p}function f(p){return p.generateMipmaps}function a(p){e.generateMipmap(p)}function U(p){return p.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?e.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function A(p,r,C,B,X=!1){if(p!==null){if(e[p]!==void 0)return e[p];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let O=r;if(r===e.RED&&(C===e.FLOAT&&(O=e.R32F),C===e.HALF_FLOAT&&(O=e.R16F),C===e.UNSIGNED_BYTE&&(O=e.R8)),r===e.RED_INTEGER&&(C===e.UNSIGNED_BYTE&&(O=e.R8UI),C===e.UNSIGNED_SHORT&&(O=e.R16UI),C===e.UNSIGNED_INT&&(O=e.R32UI),C===e.BYTE&&(O=e.R8I),C===e.SHORT&&(O=e.R16I),C===e.INT&&(O=e.R32I)),r===e.RG&&(C===e.FLOAT&&(O=e.RG32F),C===e.HALF_FLOAT&&(O=e.RG16F),C===e.UNSIGNED_BYTE&&(O=e.RG8)),r===e.RG_INTEGER&&(C===e.UNSIGNED_BYTE&&(O=e.RG8UI),C===e.UNSIGNED_SHORT&&(O=e.RG16UI),C===e.UNSIGNED_INT&&(O=e.RG32UI),C===e.BYTE&&(O=e.RG8I),C===e.SHORT&&(O=e.RG16I),C===e.INT&&(O=e.RG32I)),r===e.RGB_INTEGER&&(C===e.UNSIGNED_BYTE&&(O=e.RGB8UI),C===e.UNSIGNED_SHORT&&(O=e.RGB16UI),C===e.UNSIGNED_INT&&(O=e.RGB32UI),C===e.BYTE&&(O=e.RGB8I),C===e.SHORT&&(O=e.RGB16I),C===e.INT&&(O=e.RGB32I)),r===e.RGBA_INTEGER&&(C===e.UNSIGNED_BYTE&&(O=e.RGBA8UI),C===e.UNSIGNED_SHORT&&(O=e.RGBA16UI),C===e.UNSIGNED_INT&&(O=e.RGBA32UI),C===e.BYTE&&(O=e.RGBA8I),C===e.SHORT&&(O=e.RGBA16I),C===e.INT&&(O=e.RGBA32I)),r===e.RGB&&C===e.UNSIGNED_INT_5_9_9_9_REV&&(O=e.RGB9_E5),r===e.RGBA){const he=X?Ia:at.getTransfer(B);C===e.FLOAT&&(O=e.RGBA32F),C===e.HALF_FLOAT&&(O=e.RGBA16F),C===e.UNSIGNED_BYTE&&(O=he===Ze?e.SRGB8_ALPHA8:e.RGBA8),C===e.UNSIGNED_SHORT_4_4_4_4&&(O=e.RGBA4),C===e.UNSIGNED_SHORT_5_5_5_1&&(O=e.RGB5_A1)}return(O===e.R16F||O===e.R32F||O===e.RG16F||O===e.RG32F||O===e.RGBA16F||O===e.RGBA32F)&&n.get("EXT_color_buffer_float"),O}function m(p,r){let C;return p?r===null||r===rn||r===an?C=e.DEPTH24_STENCIL8:r===It?C=e.DEPTH32F_STENCIL8:r===Sn&&(C=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):r===null||r===rn||r===an?C=e.DEPTH_COMPONENT24:r===It?C=e.DEPTH_COMPONENT32F:r===Sn&&(C=e.DEPTH_COMPONENT16),C}function G(p,r){return f(p)===!0||p.isFramebufferTexture&&p.minFilter!==en&&p.minFilter!==kt?Math.log2(Math.max(r.width,r.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?r.mipmaps.length:1}function P(p){const r=p.target;r.removeEventListener("dispose",P),H(r),r.isVideoTexture&&L.delete(r)}function I(p){const r=p.target;r.removeEventListener("dispose",I),d(r)}function H(p){const r=i.get(p);if(r.__webglInit===void 0)return;const C=p.source,B=v.get(C);if(B){const X=B[r.__cacheKey];X.usedTimes--,X.usedTimes===0&&h(p),Object.keys(B).length===0&&v.delete(C)}i.remove(p)}function h(p){const r=i.get(p);e.deleteTexture(r.__webglTexture);const C=p.source,B=v.get(C);delete B[r.__cacheKey],u.memory.textures--}function d(p){const r=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(r.__webglFramebuffer[B]))for(let X=0;X<r.__webglFramebuffer[B].length;X++)e.deleteFramebuffer(r.__webglFramebuffer[B][X]);else e.deleteFramebuffer(r.__webglFramebuffer[B]);r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer[B])}else{if(Array.isArray(r.__webglFramebuffer))for(let B=0;B<r.__webglFramebuffer.length;B++)e.deleteFramebuffer(r.__webglFramebuffer[B]);else e.deleteFramebuffer(r.__webglFramebuffer);if(r.__webglDepthbuffer&&e.deleteRenderbuffer(r.__webglDepthbuffer),r.__webglMultisampledFramebuffer&&e.deleteFramebuffer(r.__webglMultisampledFramebuffer),r.__webglColorRenderbuffer)for(let B=0;B<r.__webglColorRenderbuffer.length;B++)r.__webglColorRenderbuffer[B]&&e.deleteRenderbuffer(r.__webglColorRenderbuffer[B]);r.__webglDepthRenderbuffer&&e.deleteRenderbuffer(r.__webglDepthRenderbuffer)}const C=p.textures;for(let B=0,X=C.length;B<X;B++){const O=i.get(C[B]);O.__webglTexture&&(e.deleteTexture(O.__webglTexture),u.memory.textures--),i.remove(C[B])}i.remove(p)}let R=0;function K(){R=0}function V(){const p=R;return p>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+p+" texture units while this GPU supports only "+s.maxTextures),R+=1,p}function Y(p){const r=[];return r.push(p.wrapS),r.push(p.wrapT),r.push(p.wrapR||0),r.push(p.magFilter),r.push(p.minFilter),r.push(p.anisotropy),r.push(p.internalFormat),r.push(p.format),r.push(p.type),r.push(p.generateMipmaps),r.push(p.premultiplyAlpha),r.push(p.flipY),r.push(p.unpackAlignment),r.push(p.colorSpace),r.join()}function Q(p,r){const C=i.get(p);if(p.isVideoTexture&&Se(p),p.isRenderTargetTexture===!1&&p.version>0&&C.__version!==p.version){const B=p.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me(C,p,r);return}}t.bindTexture(e.TEXTURE_2D,C.__webglTexture,e.TEXTURE0+r)}function W(p,r){const C=i.get(p);if(p.version>0&&C.__version!==p.version){me(C,p,r);return}t.bindTexture(e.TEXTURE_2D_ARRAY,C.__webglTexture,e.TEXTURE0+r)}function ee(p,r){const C=i.get(p);if(p.version>0&&C.__version!==p.version){me(C,p,r);return}t.bindTexture(e.TEXTURE_3D,C.__webglTexture,e.TEXTURE0+r)}function F(p,r){const C=i.get(p);if(p.version>0&&C.__version!==p.version){oe(C,p,r);return}t.bindTexture(e.TEXTURE_CUBE_MAP,C.__webglTexture,e.TEXTURE0+r)}const ve={[xr]:e.REPEAT,[Tr]:e.CLAMP_TO_EDGE,[Mr]:e.MIRRORED_REPEAT},Ae={[en]:e.NEAREST,[Ar]:e.NEAREST_MIPMAP_NEAREST,[ln]:e.NEAREST_MIPMAP_LINEAR,[kt]:e.LINEAR,[Pn]:e.LINEAR_MIPMAP_NEAREST,[Qt]:e.LINEAR_MIPMAP_LINEAR},we={[Ur]:e.NEVER,[Lr]:e.ALWAYS,[Dr]:e.LESS,[Sa]:e.LEQUAL,[Pr]:e.EQUAL,[Cr]:e.GEQUAL,[br]:e.GREATER,[Rr]:e.NOTEQUAL};function Ve(p,r){if(r.type===It&&n.has("OES_texture_float_linear")===!1&&(r.magFilter===kt||r.magFilter===Pn||r.magFilter===ln||r.magFilter===Qt||r.minFilter===kt||r.minFilter===Pn||r.minFilter===ln||r.minFilter===Qt)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(p,e.TEXTURE_WRAP_S,ve[r.wrapS]),e.texParameteri(p,e.TEXTURE_WRAP_T,ve[r.wrapT]),(p===e.TEXTURE_3D||p===e.TEXTURE_2D_ARRAY)&&e.texParameteri(p,e.TEXTURE_WRAP_R,ve[r.wrapR]),e.texParameteri(p,e.TEXTURE_MAG_FILTER,Ae[r.magFilter]),e.texParameteri(p,e.TEXTURE_MIN_FILTER,Ae[r.minFilter]),r.compareFunction&&(e.texParameteri(p,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(p,e.TEXTURE_COMPARE_FUNC,we[r.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(r.magFilter===en||r.minFilter!==ln&&r.minFilter!==Qt||r.type===It&&n.has("OES_texture_float_linear")===!1)return;if(r.anisotropy>1||i.get(r).__currentAnisotropy){const C=n.get("EXT_texture_filter_anisotropic");e.texParameterf(p,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,s.getMaxAnisotropy())),i.get(r).__currentAnisotropy=r.anisotropy}}}function nt(p,r){let C=!1;p.__webglInit===void 0&&(p.__webglInit=!0,r.addEventListener("dispose",P));const B=r.source;let X=v.get(B);X===void 0&&(X={},v.set(B,X));const O=Y(r);if(O!==p.__cacheKey){X[O]===void 0&&(X[O]={texture:e.createTexture(),usedTimes:0},u.memory.textures++,C=!0),X[O].usedTimes++;const he=X[p.__cacheKey];he!==void 0&&(X[p.__cacheKey].usedTimes--,he.usedTimes===0&&h(r)),p.__cacheKey=O,p.__webglTexture=X[O].texture}return C}function k(p,r,C){return Math.floor(Math.floor(p/C)/r)}function J(p,r,C,B){const O=p.updateRanges;if(O.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,C,B,r.data);else{O.sort((q,se)=>q.start-se.start);let he=0;for(let q=1;q<O.length;q++){const se=O[he],xe=O[q],Te=se.start+se.count,te=k(xe.start,r.width,4),Pe=k(se.start,r.width,4);xe.start<=Te+1&&te===Pe&&k(xe.start+xe.count-1,r.width,4)===te?se.count=Math.max(se.count,xe.start+xe.count-se.start):(++he,O[he]=xe)}O.length=he+1;const ie=e.getParameter(e.UNPACK_ROW_LENGTH),ue=e.getParameter(e.UNPACK_SKIP_PIXELS),_e=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let q=0,se=O.length;q<se;q++){const xe=O[q],Te=Math.floor(xe.start/4),te=Math.ceil(xe.count/4),Pe=Te%r.width,g=Math.floor(Te/r.width),ae=te,Z=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Pe),e.pixelStorei(e.UNPACK_SKIP_ROWS,g),t.texSubImage2D(e.TEXTURE_2D,0,Pe,g,ae,Z,C,B,r.data)}p.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,ie),e.pixelStorei(e.UNPACK_SKIP_PIXELS,ue),e.pixelStorei(e.UNPACK_SKIP_ROWS,_e)}}function me(p,r,C){let B=e.TEXTURE_2D;(r.isDataArrayTexture||r.isCompressedArrayTexture)&&(B=e.TEXTURE_2D_ARRAY),r.isData3DTexture&&(B=e.TEXTURE_3D);const X=nt(p,r),O=r.source;t.bindTexture(B,p.__webglTexture,e.TEXTURE0+C);const he=i.get(O);if(O.version!==he.__version||X===!0){t.activeTexture(e.TEXTURE0+C);const ie=at.getPrimaries(at.workingColorSpace),ue=r.colorSpace===Vt?null:at.getPrimaries(r.colorSpace),_e=r.colorSpace===Vt||ie===ue?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let q=D(r.image,!1,s.maxTextureSize);q=Le(r,q);const se=o.convert(r.format,r.colorSpace),xe=o.convert(r.type);let Te=A(r.internalFormat,se,xe,r.colorSpace,r.isVideoTexture);Ve(B,r);let te;const Pe=r.mipmaps,g=r.isVideoTexture!==!0,ae=he.__version===void 0||X===!0,Z=O.dataReady,ce=G(r,q);if(r.isDepthTexture)Te=m(r.format===vn,r.type),ae&&(g?t.texStorage2D(e.TEXTURE_2D,1,Te,q.width,q.height):t.texImage2D(e.TEXTURE_2D,0,Te,q.width,q.height,0,se,xe,null));else if(r.isDataTexture)if(Pe.length>0){g&&ae&&t.texStorage2D(e.TEXTURE_2D,ce,Te,Pe[0].width,Pe[0].height);for(let $=0,z=Pe.length;$<z;$++)te=Pe[$],g?Z&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,te.width,te.height,se,xe,te.data):t.texImage2D(e.TEXTURE_2D,$,Te,te.width,te.height,0,se,xe,te.data);r.generateMipmaps=!1}else g?(ae&&t.texStorage2D(e.TEXTURE_2D,ce,Te,q.width,q.height),Z&&J(r,q,se,xe)):t.texImage2D(e.TEXTURE_2D,0,Te,q.width,q.height,0,se,xe,q.data);else if(r.isCompressedTexture)if(r.isCompressedArrayTexture){g&&ae&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,Te,Pe[0].width,Pe[0].height,q.depth);for(let $=0,z=Pe.length;$<z;$++)if(te=Pe[$],r.format!==bt)if(se!==null)if(g){if(Z)if(r.layerUpdates.size>0){const fe=Hi(te.width,te.height,r.format,r.type);for(const De of r.layerUpdates){const Ke=te.data.subarray(De*fe/te.data.BYTES_PER_ELEMENT,(De+1)*fe/te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,De,te.width,te.height,1,se,Ke)}r.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,te.width,te.height,q.depth,se,te.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,Te,te.width,te.height,q.depth,0,te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else g?Z&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,te.width,te.height,q.depth,se,xe,te.data):t.texImage3D(e.TEXTURE_2D_ARRAY,$,Te,te.width,te.height,q.depth,0,se,xe,te.data)}else{g&&ae&&t.texStorage2D(e.TEXTURE_2D,ce,Te,Pe[0].width,Pe[0].height);for(let $=0,z=Pe.length;$<z;$++)te=Pe[$],r.format!==bt?se!==null?g?Z&&t.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,te.width,te.height,se,te.data):t.compressedTexImage2D(e.TEXTURE_2D,$,Te,te.width,te.height,0,te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):g?Z&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,te.width,te.height,se,xe,te.data):t.texImage2D(e.TEXTURE_2D,$,Te,te.width,te.height,0,se,xe,te.data)}else if(r.isDataArrayTexture)if(g){if(ae&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,Te,q.width,q.height,q.depth),Z)if(r.layerUpdates.size>0){const $=Hi(q.width,q.height,r.format,r.type);for(const z of r.layerUpdates){const fe=q.data.subarray(z*$/q.data.BYTES_PER_ELEMENT,(z+1)*$/q.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,z,q.width,q.height,1,se,xe,fe)}r.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,se,xe,q.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,Te,q.width,q.height,q.depth,0,se,xe,q.data);else if(r.isData3DTexture)g?(ae&&t.texStorage3D(e.TEXTURE_3D,ce,Te,q.width,q.height,q.depth),Z&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,se,xe,q.data)):t.texImage3D(e.TEXTURE_3D,0,Te,q.width,q.height,q.depth,0,se,xe,q.data);else if(r.isFramebufferTexture){if(ae)if(g)t.texStorage2D(e.TEXTURE_2D,ce,Te,q.width,q.height);else{let $=q.width,z=q.height;for(let fe=0;fe<ce;fe++)t.texImage2D(e.TEXTURE_2D,fe,Te,$,z,0,se,xe,null),$>>=1,z>>=1}}else if(Pe.length>0){if(g&&ae){const $=rt(Pe[0]);t.texStorage2D(e.TEXTURE_2D,ce,Te,$.width,$.height)}for(let $=0,z=Pe.length;$<z;$++)te=Pe[$],g?Z&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,se,xe,te):t.texImage2D(e.TEXTURE_2D,$,Te,se,xe,te);r.generateMipmaps=!1}else if(g){if(ae){const $=rt(q);t.texStorage2D(e.TEXTURE_2D,ce,Te,$.width,$.height)}Z&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,se,xe,q)}else t.texImage2D(e.TEXTURE_2D,0,Te,se,xe,q);f(r)&&a(B),he.__version=O.version,r.onUpdate&&r.onUpdate(r)}p.__version=r.version}function oe(p,r,C){if(r.image.length!==6)return;const B=nt(p,r),X=r.source;t.bindTexture(e.TEXTURE_CUBE_MAP,p.__webglTexture,e.TEXTURE0+C);const O=i.get(X);if(X.version!==O.__version||B===!0){t.activeTexture(e.TEXTURE0+C);const he=at.getPrimaries(at.workingColorSpace),ie=r.colorSpace===Vt?null:at.getPrimaries(r.colorSpace),ue=r.colorSpace===Vt||he===ie?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const _e=r.isCompressedTexture||r.image[0].isCompressedTexture,q=r.image[0]&&r.image[0].isDataTexture,se=[];for(let z=0;z<6;z++)!_e&&!q?se[z]=D(r.image[z],!0,s.maxCubemapSize):se[z]=q?r.image[z].image:r.image[z],se[z]=Le(r,se[z]);const xe=se[0],Te=o.convert(r.format,r.colorSpace),te=o.convert(r.type),Pe=A(r.internalFormat,Te,te,r.colorSpace),g=r.isVideoTexture!==!0,ae=O.__version===void 0||B===!0,Z=X.dataReady;let ce=G(r,xe);Ve(e.TEXTURE_CUBE_MAP,r);let $;if(_e){g&&ae&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Pe,xe.width,xe.height);for(let z=0;z<6;z++){$=se[z].mipmaps;for(let fe=0;fe<$.length;fe++){const De=$[fe];r.format!==bt?Te!==null?g?Z&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe,0,0,De.width,De.height,Te,De.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe,Pe,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):g?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe,0,0,De.width,De.height,Te,te,De.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe,Pe,De.width,De.height,0,Te,te,De.data)}}}else{if($=r.mipmaps,g&&ae){$.length>0&&ce++;const z=rt(se[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Pe,z.width,z.height)}for(let z=0;z<6;z++)if(q){g?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,se[z].width,se[z].height,Te,te,se[z].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Pe,se[z].width,se[z].height,0,Te,te,se[z].data);for(let fe=0;fe<$.length;fe++){const Ke=$[fe].image[z].image;g?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe+1,0,0,Ke.width,Ke.height,Te,te,Ke.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe+1,Pe,Ke.width,Ke.height,0,Te,te,Ke.data)}}else{g?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,Te,te,se[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Pe,Te,te,se[z]);for(let fe=0;fe<$.length;fe++){const De=$[fe];g?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe+1,0,0,Te,te,De.image[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe+1,Pe,Te,te,De.image[z])}}}f(r)&&a(e.TEXTURE_CUBE_MAP),O.__version=X.version,r.onUpdate&&r.onUpdate(r)}p.__version=r.version}function ge(p,r,C,B,X,O){const he=o.convert(C.format,C.colorSpace),ie=o.convert(C.type),ue=A(C.internalFormat,he,ie,C.colorSpace),_e=i.get(r),q=i.get(C);if(q.__renderTarget=r,!_e.__hasExternalTextures){const se=Math.max(1,r.width>>O),xe=Math.max(1,r.height>>O);X===e.TEXTURE_3D||X===e.TEXTURE_2D_ARRAY?t.texImage3D(X,O,ue,se,xe,r.depth,0,he,ie,null):t.texImage2D(X,O,ue,se,xe,0,he,ie,null)}t.bindFramebuffer(e.FRAMEBUFFER,p),Ne(r)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,B,X,q.__webglTexture,0,pe(r)):(X===e.TEXTURE_2D||X>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,B,X,q.__webglTexture,O),t.bindFramebuffer(e.FRAMEBUFFER,null)}function Be(p,r,C){if(e.bindRenderbuffer(e.RENDERBUFFER,p),r.depthBuffer){const B=r.depthTexture,X=B&&B.isDepthTexture?B.type:null,O=m(r.stencilBuffer,X),he=r.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=pe(r);Ne(r)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ie,O,r.width,r.height):C?e.renderbufferStorageMultisample(e.RENDERBUFFER,ie,O,r.width,r.height):e.renderbufferStorage(e.RENDERBUFFER,O,r.width,r.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,he,e.RENDERBUFFER,p)}else{const B=r.textures;for(let X=0;X<B.length;X++){const O=B[X],he=o.convert(O.format,O.colorSpace),ie=o.convert(O.type),ue=A(O.internalFormat,he,ie,O.colorSpace),_e=pe(r);C&&Ne(r)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,_e,ue,r.width,r.height):Ne(r)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_e,ue,r.width,r.height):e.renderbufferStorage(e.RENDERBUFFER,ue,r.width,r.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Re(p,r){if(r&&r.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,p),!(r.depthTexture&&r.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const B=i.get(r.depthTexture);B.__renderTarget=r,(!B.__webglTexture||r.depthTexture.image.width!==r.width||r.depthTexture.image.height!==r.height)&&(r.depthTexture.image.width=r.width,r.depthTexture.image.height=r.height,r.depthTexture.needsUpdate=!0),Q(r.depthTexture,0);const X=B.__webglTexture,O=pe(r);if(r.depthTexture.format===Qn)Ne(r)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,X,0,O):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,X,0);else if(r.depthTexture.format===vn)Ne(r)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,X,0,O):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function Je(p){const r=i.get(p),C=p.isWebGLCubeRenderTarget===!0;if(r.__boundDepthTexture!==p.depthTexture){const B=p.depthTexture;if(r.__depthDisposeCallback&&r.__depthDisposeCallback(),B){const X=()=>{delete r.__boundDepthTexture,delete r.__depthDisposeCallback,B.removeEventListener("dispose",X)};B.addEventListener("dispose",X),r.__depthDisposeCallback=X}r.__boundDepthTexture=B}if(p.depthTexture&&!r.__autoAllocateDepthBuffer){if(C)throw new Error("target.depthTexture not supported in Cube render targets");const B=p.texture.mipmaps;B&&B.length>0?Re(r.__webglFramebuffer[0],p):Re(r.__webglFramebuffer,p)}else if(C){r.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(t.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[B]),r.__webglDepthbuffer[B]===void 0)r.__webglDepthbuffer[B]=e.createRenderbuffer(),Be(r.__webglDepthbuffer[B],p,!1);else{const X=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,O=r.__webglDepthbuffer[B];e.bindRenderbuffer(e.RENDERBUFFER,O),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,O)}}else{const B=p.texture.mipmaps;if(B&&B.length>0?t.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer),r.__webglDepthbuffer===void 0)r.__webglDepthbuffer=e.createRenderbuffer(),Be(r.__webglDepthbuffer,p,!1);else{const X=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,O=r.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,O),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,O)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function et(p,r,C){const B=i.get(p);r!==void 0&&ge(B.__webglFramebuffer,p,p.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),C!==void 0&&Je(p)}function He(p){const r=p.texture,C=i.get(p),B=i.get(r);p.addEventListener("dispose",I);const X=p.textures,O=p.isWebGLCubeRenderTarget===!0,he=X.length>1;if(he||(B.__webglTexture===void 0&&(B.__webglTexture=e.createTexture()),B.__version=r.version,u.memory.textures++),O){C.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(r.mipmaps&&r.mipmaps.length>0){C.__webglFramebuffer[ie]=[];for(let ue=0;ue<r.mipmaps.length;ue++)C.__webglFramebuffer[ie][ue]=e.createFramebuffer()}else C.__webglFramebuffer[ie]=e.createFramebuffer()}else{if(r.mipmaps&&r.mipmaps.length>0){C.__webglFramebuffer=[];for(let ie=0;ie<r.mipmaps.length;ie++)C.__webglFramebuffer[ie]=e.createFramebuffer()}else C.__webglFramebuffer=e.createFramebuffer();if(he)for(let ie=0,ue=X.length;ie<ue;ie++){const _e=i.get(X[ie]);_e.__webglTexture===void 0&&(_e.__webglTexture=e.createTexture(),u.memory.textures++)}if(p.samples>0&&Ne(p)===!1){C.__webglMultisampledFramebuffer=e.createFramebuffer(),C.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let ie=0;ie<X.length;ie++){const ue=X[ie];C.__webglColorRenderbuffer[ie]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,C.__webglColorRenderbuffer[ie]);const _e=o.convert(ue.format,ue.colorSpace),q=o.convert(ue.type),se=A(ue.internalFormat,_e,q,ue.colorSpace,p.isXRRenderTarget===!0),xe=pe(p);e.renderbufferStorageMultisample(e.RENDERBUFFER,xe,se,p.width,p.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ie,e.RENDERBUFFER,C.__webglColorRenderbuffer[ie])}e.bindRenderbuffer(e.RENDERBUFFER,null),p.depthBuffer&&(C.__webglDepthRenderbuffer=e.createRenderbuffer(),Be(C.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(O){t.bindTexture(e.TEXTURE_CUBE_MAP,B.__webglTexture),Ve(e.TEXTURE_CUBE_MAP,r);for(let ie=0;ie<6;ie++)if(r.mipmaps&&r.mipmaps.length>0)for(let ue=0;ue<r.mipmaps.length;ue++)ge(C.__webglFramebuffer[ie][ue],p,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ue);else ge(C.__webglFramebuffer[ie],p,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);f(r)&&a(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let ie=0,ue=X.length;ie<ue;ie++){const _e=X[ie],q=i.get(_e);t.bindTexture(e.TEXTURE_2D,q.__webglTexture),Ve(e.TEXTURE_2D,_e),ge(C.__webglFramebuffer,p,_e,e.COLOR_ATTACHMENT0+ie,e.TEXTURE_2D,0),f(_e)&&a(e.TEXTURE_2D)}t.unbindTexture()}else{let ie=e.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(ie=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ie,B.__webglTexture),Ve(ie,r),r.mipmaps&&r.mipmaps.length>0)for(let ue=0;ue<r.mipmaps.length;ue++)ge(C.__webglFramebuffer[ue],p,r,e.COLOR_ATTACHMENT0,ie,ue);else ge(C.__webglFramebuffer,p,r,e.COLOR_ATTACHMENT0,ie,0);f(r)&&a(ie),t.unbindTexture()}p.depthBuffer&&Je(p)}function _(p){const r=p.textures;for(let C=0,B=r.length;C<B;C++){const X=r[C];if(f(X)){const O=U(p),he=i.get(X).__webglTexture;t.bindTexture(O,he),a(O),t.unbindTexture()}}}const ct=[],Ge=[];function Ye(p){if(p.samples>0){if(Ne(p)===!1){const r=p.textures,C=p.width,B=p.height;let X=e.COLOR_BUFFER_BIT;const O=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,he=i.get(p),ie=r.length>1;if(ie)for(let _e=0;_e<r.length;_e++)t.bindFramebuffer(e.FRAMEBUFFER,he.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,he.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const ue=p.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let _e=0;_e<r.length;_e++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(X|=e.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(X|=e.STENCIL_BUFFER_BIT)),ie){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,he.__webglColorRenderbuffer[_e]);const q=i.get(r[_e]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,q,0)}e.blitFramebuffer(0,0,C,B,0,0,C,B,X,e.NEAREST),b===!0&&(ct.length=0,Ge.length=0,ct.push(e.COLOR_ATTACHMENT0+_e),p.depthBuffer&&p.resolveDepthBuffer===!1&&(ct.push(O),Ge.push(O),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ge)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ie)for(let _e=0;_e<r.length;_e++){t.bindFramebuffer(e.FRAMEBUFFER,he.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,he.__webglColorRenderbuffer[_e]);const q=i.get(r[_e]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,he.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,q,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.resolveDepthBuffer===!1&&b){const r=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[r])}}}function pe(p){return Math.min(s.maxSamples,p.samples)}function Ne(p){const r=i.get(p);return p.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&r.__useRenderToTexture!==!1}function Se(p){const r=u.render.frame;L.get(p)!==r&&(L.set(p,r),p.update())}function Le(p,r){const C=p.colorSpace,B=p.format,X=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||C!==Tn&&C!==Vt&&(at.getTransfer(C)===Ze?(B!==bt||X!==Ot)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",C)),r}function rt(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(E.width=p.naturalWidth||p.width,E.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(E.width=p.displayWidth,E.height=p.displayHeight):(E.width=p.width,E.height=p.height),E}this.allocateTextureUnit=V,this.resetTextureUnits=K,this.setTexture2D=Q,this.setTexture2DArray=W,this.setTexture3D=ee,this.setTextureCube=F,this.rebindTextures=et,this.setupRenderTarget=He,this.updateRenderTargetMipmap=_,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Ne}function Qf(e,n){function t(i,s=Vt){let o;const u=at.getTransfer(s);if(i===Ot)return e.UNSIGNED_BYTE;if(i===xa)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Aa)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Nr)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Or)return e.BYTE;if(i===Fr)return e.SHORT;if(i===Sn)return e.UNSIGNED_SHORT;if(i===Ca)return e.INT;if(i===rn)return e.UNSIGNED_INT;if(i===It)return e.FLOAT;if(i===Mn)return e.HALF_FLOAT;if(i===Br)return e.ALPHA;if(i===Hr)return e.RGB;if(i===bt)return e.RGBA;if(i===Qn)return e.DEPTH_COMPONENT;if(i===vn)return e.DEPTH_STENCIL;if(i===Gr)return e.RED;if(i===Pa)return e.RED_INTEGER;if(i===Vr)return e.RG;if(i===Da)return e.RG_INTEGER;if(i===La)return e.RGBA_INTEGER;if(i===Dn||i===Ln||i===Un||i===wn)if(u===Ze)if(o=n.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Dn)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ln)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Un)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wn)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=n.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Dn)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ln)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Un)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wn)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===li||i===ci||i===fi||i===di)if(o=n.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===li)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ci)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fi)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===di)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ui||i===pi||i===hi)if(o=n.get("WEBGL_compressed_texture_etc"),o!==null){if(i===ui||i===pi)return u===Ze?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===hi)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===_i||i===mi||i===gi||i===vi||i===Ei||i===Si||i===Mi||i===Ti||i===xi||i===Ai||i===Ri||i===bi||i===Ci||i===Pi)if(o=n.get("WEBGL_compressed_texture_astc"),o!==null){if(i===_i)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===mi)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===gi)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vi)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ei)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Si)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Mi)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ti)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===xi)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ai)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ri)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bi)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ci)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Pi)return u===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===yn||i===Di||i===Li)if(o=n.get("EXT_texture_compression_bptc"),o!==null){if(i===yn)return u===Ze?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Di)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Li)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===kr||i===Ui||i===wi||i===yi)if(o=n.get("EXT_texture_compression_rgtc"),o!==null){if(i===yn)return o.COMPRESSED_RED_RGTC1_EXT;if(i===Ui)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===wi)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yi)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===an?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Jf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ed=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class td{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t,i){if(this.texture===null){const s=new Ra,o=n.properties.get(s);o.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Ft({vertexShader:Jf,fragmentShader:ed,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dt(new ba(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nd extends tr{constructor(n,t){super();const i=this;let s=null,o=1,u=null,c="local-floor",b=1,E=null,L=null,M=null,v=null,x=null,N=null;const D=new td,f=t.getContextAttributes();let a=null,U=null;const A=[],m=[],G=new $e;let P=null;const I=new hn;I.viewport=new _t;const H=new hn;H.viewport=new _t;const h=[I,H],d=new nr;let R=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let J=A[k];return J===void 0&&(J=new Cn,A[k]=J),J.getTargetRaySpace()},this.getControllerGrip=function(k){let J=A[k];return J===void 0&&(J=new Cn,A[k]=J),J.getGripSpace()},this.getHand=function(k){let J=A[k];return J===void 0&&(J=new Cn,A[k]=J),J.getHandSpace()};function V(k){const J=m.indexOf(k.inputSource);if(J===-1)return;const me=A[J];me!==void 0&&(me.update(k.inputSource,k.frame,E||u),me.dispatchEvent({type:k.type,data:k.inputSource}))}function Y(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",Q);for(let k=0;k<A.length;k++){const J=m[k];J!==null&&(m[k]=null,A[k].disconnect(J))}R=null,K=null,D.reset(),n.setRenderTarget(a),x=null,v=null,M=null,s=null,U=null,nt.stop(),i.isPresenting=!1,n.setPixelRatio(P),n.setSize(G.width,G.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){o=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){c=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return E||u},this.setReferenceSpace=function(k){E=k},this.getBaseLayer=function(){return v!==null?v:x},this.getBinding=function(){return M},this.getFrame=function(){return N},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(a=n.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",Q),f.xrCompatible!==!0&&await t.makeXRCompatible(),P=n.getPixelRatio(),n.getSize(G),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,oe=null,ge=null;f.depth&&(ge=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=f.stencil?vn:Qn,oe=f.stencil?an:rn);const Be={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:o};M=new XRWebGLBinding(s,t),v=M.createProjectionLayer(Be),s.updateRenderState({layers:[v]}),n.setPixelRatio(1),n.setSize(v.textureWidth,v.textureHeight,!1),U=new Kt(v.textureWidth,v.textureHeight,{format:bt,type:Ot,depthTexture:new va(v.textureWidth,v.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:f.stencil,colorSpace:n.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}else{const me={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:o};x=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:x}),n.setPixelRatio(1),n.setSize(x.framebufferWidth,x.framebufferHeight,!1),U=new Kt(x.framebufferWidth,x.framebufferHeight,{format:bt,type:Ot,colorSpace:n.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(b),E=null,u=await s.requestReferenceSpace(c),nt.setContext(s),nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return D.getDepthTexture()};function Q(k){for(let J=0;J<k.removed.length;J++){const me=k.removed[J],oe=m.indexOf(me);oe>=0&&(m[oe]=null,A[oe].disconnect(me))}for(let J=0;J<k.added.length;J++){const me=k.added[J];let oe=m.indexOf(me);if(oe===-1){for(let Be=0;Be<A.length;Be++)if(Be>=m.length){m.push(me),oe=Be;break}else if(m[Be]===null){m[Be]=me,oe=Be;break}if(oe===-1)break}const ge=A[oe];ge&&ge.connect(me)}}const W=new ye,ee=new ye;function F(k,J,me){W.setFromMatrixPosition(J.matrixWorld),ee.setFromMatrixPosition(me.matrixWorld);const oe=W.distanceTo(ee),ge=J.projectionMatrix.elements,Be=me.projectionMatrix.elements,Re=ge[14]/(ge[10]-1),Je=ge[14]/(ge[10]+1),et=(ge[9]+1)/ge[5],He=(ge[9]-1)/ge[5],_=(ge[8]-1)/ge[0],ct=(Be[8]+1)/Be[0],Ge=Re*_,Ye=Re*ct,pe=oe/(-_+ct),Ne=pe*-_;if(J.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Ne),k.translateZ(pe),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),ge[10]===-1)k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Se=Re+pe,Le=Je+pe,rt=Ge-Ne,p=Ye+(oe-Ne),r=et*Je/Le*Se,C=He*Je/Le*Se;k.projectionMatrix.makePerspective(rt,p,r,C,Se,Le),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function ve(k,J){J===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(J.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let J=k.near,me=k.far;D.texture!==null&&(D.depthNear>0&&(J=D.depthNear),D.depthFar>0&&(me=D.depthFar)),d.near=H.near=I.near=J,d.far=H.far=I.far=me,(R!==d.near||K!==d.far)&&(s.updateRenderState({depthNear:d.near,depthFar:d.far}),R=d.near,K=d.far),I.layers.mask=k.layers.mask|2,H.layers.mask=k.layers.mask|4,d.layers.mask=I.layers.mask|H.layers.mask;const oe=k.parent,ge=d.cameras;ve(d,oe);for(let Be=0;Be<ge.length;Be++)ve(ge[Be],oe);ge.length===2?F(d,I,H):d.projectionMatrix.copy(I.projectionMatrix),Ae(k,d,oe)};function Ae(k,J,me){me===null?k.matrix.copy(J.matrixWorld):(k.matrix.copy(me.matrixWorld),k.matrix.invert(),k.matrix.multiply(J.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=ir*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return d},this.getFoveation=function(){if(!(v===null&&x===null))return b},this.setFoveation=function(k){b=k,v!==null&&(v.fixedFoveation=k),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=k)},this.hasDepthSensing=function(){return D.texture!==null},this.getDepthSensingMesh=function(){return D.getMesh(d)};let we=null;function Ve(k,J){if(L=J.getViewerPose(E||u),N=J,L!==null){const me=L.views;x!==null&&(n.setRenderTargetFramebuffer(U,x.framebuffer),n.setRenderTarget(U));let oe=!1;me.length!==d.cameras.length&&(d.cameras.length=0,oe=!0);for(let Re=0;Re<me.length;Re++){const Je=me[Re];let et=null;if(x!==null)et=x.getViewport(Je);else{const _=M.getViewSubImage(v,Je);et=_.viewport,Re===0&&(n.setRenderTargetTextures(U,_.colorTexture,_.depthStencilTexture),n.setRenderTarget(U))}let He=h[Re];He===void 0&&(He=new hn,He.layers.enable(Re),He.viewport=new _t,h[Re]=He),He.matrix.fromArray(Je.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Je.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(et.x,et.y,et.width,et.height),Re===0&&(d.matrix.copy(He.matrix),d.matrix.decompose(d.position,d.quaternion,d.scale)),oe===!0&&d.cameras.push(He)}const ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){const Re=M.getDepthInformation(me[0]);Re&&Re.isValid&&Re.texture&&D.init(n,Re,s.renderState)}}for(let me=0;me<A.length;me++){const oe=m[me],ge=A[me];oe!==null&&ge!==void 0&&ge.update(oe,J,E||u)}we&&we(k,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),N=null}const nt=new Na;nt.setAnimationLoop(Ve),this.setAnimationLoop=function(k){we=k},this.dispose=function(){}}}const Ut=new ya,id=new Yt;function ad(e,n){function t(f,a){f.matrixAutoUpdate===!0&&f.updateMatrix(),a.value.copy(f.matrix)}function i(f,a){a.color.getRGB(f.fogColor.value,wa(e)),a.isFog?(f.fogNear.value=a.near,f.fogFar.value=a.far):a.isFogExp2&&(f.fogDensity.value=a.density)}function s(f,a,U,A,m){a.isMeshBasicMaterial||a.isMeshLambertMaterial?o(f,a):a.isMeshToonMaterial?(o(f,a),M(f,a)):a.isMeshPhongMaterial?(o(f,a),L(f,a)):a.isMeshStandardMaterial?(o(f,a),v(f,a),a.isMeshPhysicalMaterial&&x(f,a,m)):a.isMeshMatcapMaterial?(o(f,a),N(f,a)):a.isMeshDepthMaterial?o(f,a):a.isMeshDistanceMaterial?(o(f,a),D(f,a)):a.isMeshNormalMaterial?o(f,a):a.isLineBasicMaterial?(u(f,a),a.isLineDashedMaterial&&c(f,a)):a.isPointsMaterial?b(f,a,U,A):a.isSpriteMaterial?E(f,a):a.isShadowMaterial?(f.color.value.copy(a.color),f.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}function o(f,a){f.opacity.value=a.opacity,a.color&&f.diffuse.value.copy(a.color),a.emissive&&f.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(f.map.value=a.map,t(a.map,f.mapTransform)),a.alphaMap&&(f.alphaMap.value=a.alphaMap,t(a.alphaMap,f.alphaMapTransform)),a.bumpMap&&(f.bumpMap.value=a.bumpMap,t(a.bumpMap,f.bumpMapTransform),f.bumpScale.value=a.bumpScale,a.side===vt&&(f.bumpScale.value*=-1)),a.normalMap&&(f.normalMap.value=a.normalMap,t(a.normalMap,f.normalMapTransform),f.normalScale.value.copy(a.normalScale),a.side===vt&&f.normalScale.value.negate()),a.displacementMap&&(f.displacementMap.value=a.displacementMap,t(a.displacementMap,f.displacementMapTransform),f.displacementScale.value=a.displacementScale,f.displacementBias.value=a.displacementBias),a.emissiveMap&&(f.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,f.emissiveMapTransform)),a.specularMap&&(f.specularMap.value=a.specularMap,t(a.specularMap,f.specularMapTransform)),a.alphaTest>0&&(f.alphaTest.value=a.alphaTest);const U=n.get(a),A=U.envMap,m=U.envMapRotation;A&&(f.envMap.value=A,Ut.copy(m),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),f.envMapRotation.value.setFromMatrix4(id.makeRotationFromEuler(Ut)),f.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=a.reflectivity,f.ior.value=a.ior,f.refractionRatio.value=a.refractionRatio),a.lightMap&&(f.lightMap.value=a.lightMap,f.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,f.lightMapTransform)),a.aoMap&&(f.aoMap.value=a.aoMap,f.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,f.aoMapTransform))}function u(f,a){f.diffuse.value.copy(a.color),f.opacity.value=a.opacity,a.map&&(f.map.value=a.map,t(a.map,f.mapTransform))}function c(f,a){f.dashSize.value=a.dashSize,f.totalSize.value=a.dashSize+a.gapSize,f.scale.value=a.scale}function b(f,a,U,A){f.diffuse.value.copy(a.color),f.opacity.value=a.opacity,f.size.value=a.size*U,f.scale.value=A*.5,a.map&&(f.map.value=a.map,t(a.map,f.uvTransform)),a.alphaMap&&(f.alphaMap.value=a.alphaMap,t(a.alphaMap,f.alphaMapTransform)),a.alphaTest>0&&(f.alphaTest.value=a.alphaTest)}function E(f,a){f.diffuse.value.copy(a.color),f.opacity.value=a.opacity,f.rotation.value=a.rotation,a.map&&(f.map.value=a.map,t(a.map,f.mapTransform)),a.alphaMap&&(f.alphaMap.value=a.alphaMap,t(a.alphaMap,f.alphaMapTransform)),a.alphaTest>0&&(f.alphaTest.value=a.alphaTest)}function L(f,a){f.specular.value.copy(a.specular),f.shininess.value=Math.max(a.shininess,1e-4)}function M(f,a){a.gradientMap&&(f.gradientMap.value=a.gradientMap)}function v(f,a){f.metalness.value=a.metalness,a.metalnessMap&&(f.metalnessMap.value=a.metalnessMap,t(a.metalnessMap,f.metalnessMapTransform)),f.roughness.value=a.roughness,a.roughnessMap&&(f.roughnessMap.value=a.roughnessMap,t(a.roughnessMap,f.roughnessMapTransform)),a.envMap&&(f.envMapIntensity.value=a.envMapIntensity)}function x(f,a,U){f.ior.value=a.ior,a.sheen>0&&(f.sheenColor.value.copy(a.sheenColor).multiplyScalar(a.sheen),f.sheenRoughness.value=a.sheenRoughness,a.sheenColorMap&&(f.sheenColorMap.value=a.sheenColorMap,t(a.sheenColorMap,f.sheenColorMapTransform)),a.sheenRoughnessMap&&(f.sheenRoughnessMap.value=a.sheenRoughnessMap,t(a.sheenRoughnessMap,f.sheenRoughnessMapTransform))),a.clearcoat>0&&(f.clearcoat.value=a.clearcoat,f.clearcoatRoughness.value=a.clearcoatRoughness,a.clearcoatMap&&(f.clearcoatMap.value=a.clearcoatMap,t(a.clearcoatMap,f.clearcoatMapTransform)),a.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=a.clearcoatRoughnessMap,t(a.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),a.clearcoatNormalMap&&(f.clearcoatNormalMap.value=a.clearcoatNormalMap,t(a.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(a.clearcoatNormalScale),a.side===vt&&f.clearcoatNormalScale.value.negate())),a.dispersion>0&&(f.dispersion.value=a.dispersion),a.iridescence>0&&(f.iridescence.value=a.iridescence,f.iridescenceIOR.value=a.iridescenceIOR,f.iridescenceThicknessMinimum.value=a.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=a.iridescenceThicknessRange[1],a.iridescenceMap&&(f.iridescenceMap.value=a.iridescenceMap,t(a.iridescenceMap,f.iridescenceMapTransform)),a.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=a.iridescenceThicknessMap,t(a.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),a.transmission>0&&(f.transmission.value=a.transmission,f.transmissionSamplerMap.value=U.texture,f.transmissionSamplerSize.value.set(U.width,U.height),a.transmissionMap&&(f.transmissionMap.value=a.transmissionMap,t(a.transmissionMap,f.transmissionMapTransform)),f.thickness.value=a.thickness,a.thicknessMap&&(f.thicknessMap.value=a.thicknessMap,t(a.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=a.attenuationDistance,f.attenuationColor.value.copy(a.attenuationColor)),a.anisotropy>0&&(f.anisotropyVector.value.set(a.anisotropy*Math.cos(a.anisotropyRotation),a.anisotropy*Math.sin(a.anisotropyRotation)),a.anisotropyMap&&(f.anisotropyMap.value=a.anisotropyMap,t(a.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=a.specularIntensity,f.specularColor.value.copy(a.specularColor),a.specularColorMap&&(f.specularColorMap.value=a.specularColorMap,t(a.specularColorMap,f.specularColorMapTransform)),a.specularIntensityMap&&(f.specularIntensityMap.value=a.specularIntensityMap,t(a.specularIntensityMap,f.specularIntensityMapTransform))}function N(f,a){a.matcap&&(f.matcap.value=a.matcap)}function D(f,a){const U=n.get(a).light;f.referencePosition.value.setFromMatrixPosition(U.matrixWorld),f.nearDistance.value=U.shadow.camera.near,f.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function rd(e,n,t,i){let s={},o={},u=[];const c=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function b(U,A){const m=A.program;i.uniformBlockBinding(U,m)}function E(U,A){let m=s[U.id];m===void 0&&(N(U),m=L(U),s[U.id]=m,U.addEventListener("dispose",f));const G=A.program;i.updateUBOMapping(U,G);const P=n.render.frame;o[U.id]!==P&&(v(U),o[U.id]=P)}function L(U){const A=M();U.__bindingPointIndex=A;const m=e.createBuffer(),G=U.__size,P=U.usage;return e.bindBuffer(e.UNIFORM_BUFFER,m),e.bufferData(e.UNIFORM_BUFFER,G,P),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,A,m),m}function M(){for(let U=0;U<c;U++)if(u.indexOf(U)===-1)return u.push(U),U;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(U){const A=s[U.id],m=U.uniforms,G=U.__cache;e.bindBuffer(e.UNIFORM_BUFFER,A);for(let P=0,I=m.length;P<I;P++){const H=Array.isArray(m[P])?m[P]:[m[P]];for(let h=0,d=H.length;h<d;h++){const R=H[h];if(x(R,P,h,G)===!0){const K=R.__offset,V=Array.isArray(R.value)?R.value:[R.value];let Y=0;for(let Q=0;Q<V.length;Q++){const W=V[Q],ee=D(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,K+Y,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):(W.toArray(R.__data,Y),Y+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,K,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function x(U,A,m,G){const P=U.value,I=A+"_"+m;if(G[I]===void 0)return typeof P=="number"||typeof P=="boolean"?G[I]=P:G[I]=P.clone(),!0;{const H=G[I];if(typeof P=="number"||typeof P=="boolean"){if(H!==P)return G[I]=P,!0}else if(H.equals(P)===!1)return H.copy(P),!0}return!1}function N(U){const A=U.uniforms;let m=0;const G=16;for(let I=0,H=A.length;I<H;I++){const h=Array.isArray(A[I])?A[I]:[A[I]];for(let d=0,R=h.length;d<R;d++){const K=h[d],V=Array.isArray(K.value)?K.value:[K.value];for(let Y=0,Q=V.length;Y<Q;Y++){const W=V[Y],ee=D(W),F=m%G,ve=F%ee.boundary,Ae=F+ve;m+=ve,Ae!==0&&G-Ae<ee.storage&&(m+=G-Ae),K.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=m,m+=ee.storage}}}const P=m%G;return P>0&&(m+=G-P),U.__size=m,U.__cache={},this}function D(U){const A={boundary:0,storage:0};return typeof U=="number"||typeof U=="boolean"?(A.boundary=4,A.storage=4):U.isVector2?(A.boundary=8,A.storage=8):U.isVector3||U.isColor?(A.boundary=16,A.storage=12):U.isVector4?(A.boundary=16,A.storage=16):U.isMatrix3?(A.boundary=48,A.storage=48):U.isMatrix4?(A.boundary=64,A.storage=64):U.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",U),A}function f(U){const A=U.target;A.removeEventListener("dispose",f);const m=u.indexOf(A.__bindingPointIndex);u.splice(m,1),e.deleteBuffer(s[A.id]),delete s[A.id],delete o[A.id]}function a(){for(const U in s)e.deleteBuffer(s[U]);u=[],s={},o={}}return{bind:b,update:E,dispose:a}}class Sd{constructor(n={}){const{canvas:t=Ka(),context:i=null,depth:s=!0,stencil:o=!1,alpha:u=!1,antialias:c=!1,premultipliedAlpha:b=!0,preserveDrawingBuffer:E=!1,powerPreference:L="default",failIfMajorPerformanceCaveat:M=!1,reverseDepthBuffer:v=!1}=n;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=u;const N=new Uint32Array(4),D=new Int32Array(4);let f=null,a=null;const U=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ct,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const m=this;let G=!1;this._outputColorSpace=qa;let P=0,I=0,H=null,h=-1,d=null;const R=new _t,K=new _t;let V=null;const Y=new Qe(0);let Q=0,W=t.width,ee=t.height,F=1,ve=null,Ae=null;const we=new _t(0,0,W,ee),Ve=new _t(0,0,W,ee);let nt=!1;const k=new ma;let J=!1,me=!1;const oe=new Yt,ge=new Yt,Be=new ye,Re=new _t,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function He(){return H===null?F:1}let _=i;function ct(l,S){return t.getContext(l,S)}try{const l={alpha:!0,depth:s,stencil:o,antialias:c,premultipliedAlpha:b,preserveDrawingBuffer:E,powerPreference:L,failIfMajorPerformanceCaveat:M};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Za}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",$,!1),t.addEventListener("webglcontextcreationerror",z,!1),_===null){const S="webgl2";if(_=ct(S,l),_===null)throw ct(S)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(l){throw console.error("THREE.WebGLRenderer: "+l.message),l}let Ge,Ye,pe,Ne,Se,Le,rt,p,r,C,B,X,O,he,ie,ue,_e,q,se,xe,Te,te,Pe,g;function ae(){Ge=new _c(_),Ge.init(),te=new Qf(_,Ge),Ye=new lc(_,Ge,n,te),pe=new $f(_,Ge),Ye.reverseDepthBuffer&&v&&pe.buffers.depth.setReversed(!0),Ne=new vc(_),Se=new Ff,Le=new jf(_,Ge,pe,Se,Ye,te,Ne),rt=new fc(m),p=new hc(m),r=new Ao(_),Pe=new oc(_,r),C=new mc(_,r,Ne,Pe),B=new Sc(_,C,r,Ne),se=new Ec(_,Ye,Le),ue=new cc(Se),X=new Of(m,rt,p,Ge,Ye,Pe,ue),O=new ad(m,Se),he=new Hf,ie=new Xf(Ge),q=new rc(m,rt,p,pe,B,x,b),_e=new qf(m,B,Ye),g=new rd(_,Ne,Ye,pe),xe=new sc(_,Ge,Ne),Te=new gc(_,Ge,Ne),Ne.programs=X.programs,m.capabilities=Ye,m.extensions=Ge,m.properties=Se,m.renderLists=he,m.shadowMap=_e,m.state=pe,m.info=Ne}ae();const Z=new nd(m,_);this.xr=Z,this.getContext=function(){return _},this.getContextAttributes=function(){return _.getContextAttributes()},this.forceContextLoss=function(){const l=Ge.get("WEBGL_lose_context");l&&l.loseContext()},this.forceContextRestore=function(){const l=Ge.get("WEBGL_lose_context");l&&l.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(l){l!==void 0&&(F=l,this.setSize(W,ee,!1))},this.getSize=function(l){return l.set(W,ee)},this.setSize=function(l,S,w=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=l,ee=S,t.width=Math.floor(l*F),t.height=Math.floor(S*F),w===!0&&(t.style.width=l+"px",t.style.height=S+"px"),this.setViewport(0,0,l,S)},this.getDrawingBufferSize=function(l){return l.set(W*F,ee*F).floor()},this.setDrawingBufferSize=function(l,S,w){W=l,ee=S,F=w,t.width=Math.floor(l*w),t.height=Math.floor(S*w),this.setViewport(0,0,l,S)},this.getCurrentViewport=function(l){return l.copy(R)},this.getViewport=function(l){return l.copy(we)},this.setViewport=function(l,S,w,y){l.isVector4?we.set(l.x,l.y,l.z,l.w):we.set(l,S,w,y),pe.viewport(R.copy(we).multiplyScalar(F).round())},this.getScissor=function(l){return l.copy(Ve)},this.setScissor=function(l,S,w,y){l.isVector4?Ve.set(l.x,l.y,l.z,l.w):Ve.set(l,S,w,y),pe.scissor(K.copy(Ve).multiplyScalar(F).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(l){pe.setScissorTest(nt=l)},this.setOpaqueSort=function(l){ve=l},this.setTransparentSort=function(l){Ae=l},this.getClearColor=function(l){return l.copy(q.getClearColor())},this.setClearColor=function(){q.setClearColor(...arguments)},this.getClearAlpha=function(){return q.getClearAlpha()},this.setClearAlpha=function(){q.setClearAlpha(...arguments)},this.clear=function(l=!0,S=!0,w=!0){let y=0;if(l){let T=!1;if(H!==null){const j=H.texture.format;T=j===La||j===Da||j===Pa}if(T){const j=H.texture.type,re=j===Ot||j===rn||j===Sn||j===an||j===xa||j===Aa,de=q.getClearColor(),le=q.getClearAlpha(),be=de.r,Ce=de.g,Ee=de.b;re?(N[0]=be,N[1]=Ce,N[2]=Ee,N[3]=le,_.clearBufferuiv(_.COLOR,0,N)):(D[0]=be,D[1]=Ce,D[2]=Ee,D[3]=le,_.clearBufferiv(_.COLOR,0,D))}else y|=_.COLOR_BUFFER_BIT}S&&(y|=_.DEPTH_BUFFER_BIT),w&&(y|=_.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),_.clear(y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",$,!1),t.removeEventListener("webglcontextcreationerror",z,!1),q.dispose(),he.dispose(),ie.dispose(),Se.dispose(),rt.dispose(),p.dispose(),B.dispose(),Pe.dispose(),g.dispose(),X.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",ti),Z.removeEventListener("sessionend",ni),Pt.stop()};function ce(l){l.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),G=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),G=!1;const l=Ne.autoReset,S=_e.enabled,w=_e.autoUpdate,y=_e.needsUpdate,T=_e.type;ae(),Ne.autoReset=l,_e.enabled=S,_e.autoUpdate=w,_e.needsUpdate=y,_e.type=T}function z(l){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",l.statusMessage)}function fe(l){const S=l.target;S.removeEventListener("dispose",fe),De(S)}function De(l){Ke(l),Se.remove(l)}function Ke(l){const S=Se.get(l).programs;S!==void 0&&(S.forEach(function(w){X.releaseProgram(w)}),l.isShaderMaterial&&X.releaseShaderCache(l))}this.renderBufferDirect=function(l,S,w,y,T,j){S===null&&(S=Je);const re=T.isMesh&&T.matrixWorld.determinant()<0,de=Va(l,S,w,y,T);pe.setMaterial(y,re);let le=w.index,be=1;if(y.wireframe===!0){if(le=C.getWireframeAttribute(w),le===void 0)return;be=2}const Ce=w.drawRange,Ee=w.attributes.position;let Ie=Ce.start*be,ze=(Ce.start+Ce.count)*be;j!==null&&(Ie=Math.max(Ie,j.start*be),ze=Math.min(ze,(j.start+j.count)*be)),le!==null?(Ie=Math.max(Ie,0),ze=Math.min(ze,le.count)):Ee!=null&&(Ie=Math.max(Ie,0),ze=Math.min(ze,Ee.count));const it=ze-Ie;if(it<0||it===1/0)return;Pe.setup(T,y,de,w,le);let qe,Xe=xe;if(le!==null&&(qe=r.get(le),Xe=Te,Xe.setIndex(qe)),T.isMesh)y.wireframe===!0?(pe.setLineWidth(y.wireframeLinewidth*He()),Xe.setMode(_.LINES)):Xe.setMode(_.TRIANGLES);else if(T.isLine){let Me=y.linewidth;Me===void 0&&(Me=1),pe.setLineWidth(Me*He()),T.isLineSegments?Xe.setMode(_.LINES):T.isLineLoop?Xe.setMode(_.LINE_LOOP):Xe.setMode(_.LINE_STRIP)}else T.isPoints?Xe.setMode(_.POINTS):T.isSprite&&Xe.setMode(_.TRIANGLES);if(T.isBatchedMesh)if(T._multiDrawInstances!==null)pn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Xe.renderMultiDrawInstances(T._multiDrawStarts,T._multiDrawCounts,T._multiDrawCount,T._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))Xe.renderMultiDraw(T._multiDrawStarts,T._multiDrawCounts,T._multiDrawCount);else{const Me=T._multiDrawStarts,tt=T._multiDrawCounts,Oe=T._multiDrawCount,mt=le?r.get(le).bytesPerElement:1,Bt=Se.get(y).currentProgram.getUniforms();for(let gt=0;gt<Oe;gt++)Bt.setValue(_,"_gl_DrawID",gt),Xe.render(Me[gt]/mt,tt[gt])}else if(T.isInstancedMesh)Xe.renderInstances(Ie,it,T.count);else if(w.isInstancedBufferGeometry){const Me=w._maxInstanceCount!==void 0?w._maxInstanceCount:1/0,tt=Math.min(w.instanceCount,Me);Xe.renderInstances(Ie,it,tt)}else Xe.render(Ie,it)};function ke(l,S,w){l.transparent===!0&&l.side===Rt&&l.forceSinglePass===!1?(l.side=vt,l.needsUpdate=!0,sn(l,S,w),l.side=tn,l.needsUpdate=!0,sn(l,S,w),l.side=Rt):sn(l,S,w)}this.compile=function(l,S,w=null){w===null&&(w=l),a=ie.get(w),a.init(S),A.push(a),w.traverseVisible(function(T){T.isLight&&T.layers.test(S.layers)&&(a.pushLight(T),T.castShadow&&a.pushShadow(T))}),l!==w&&l.traverseVisible(function(T){T.isLight&&T.layers.test(S.layers)&&(a.pushLight(T),T.castShadow&&a.pushShadow(T))}),a.setupLights();const y=new Set;return l.traverse(function(T){if(!(T.isMesh||T.isPoints||T.isLine||T.isSprite))return;const j=T.material;if(j)if(Array.isArray(j))for(let re=0;re<j.length;re++){const de=j[re];ke(de,w,T),y.add(de)}else ke(j,w,T),y.add(j)}),a=A.pop(),y},this.compileAsync=function(l,S,w=null){const y=this.compile(l,S,w);return new Promise(T=>{function j(){if(y.forEach(function(re){Se.get(re).currentProgram.isReady()&&y.delete(re)}),y.size===0){T(l);return}setTimeout(j,10)}Ge.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Mt=null;function xt(l){Mt&&Mt(l)}function ti(){Pt.stop()}function ni(){Pt.start()}const Pt=new Na;Pt.setAnimationLoop(xt),typeof self<"u"&&Pt.setContext(self),this.setAnimationLoop=function(l){Mt=l,Z.setAnimationLoop(l),l===null?Pt.stop():Pt.start()},Z.addEventListener("sessionstart",ti),Z.addEventListener("sessionend",ni),this.render=function(l,S){if(S!==void 0&&S.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;if(l.matrixWorldAutoUpdate===!0&&l.updateMatrixWorld(),S.parent===null&&S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(S),S=Z.getCamera()),l.isScene===!0&&l.onBeforeRender(m,l,S,H),a=ie.get(l,A.length),a.init(S),A.push(a),ge.multiplyMatrices(S.projectionMatrix,S.matrixWorldInverse),k.setFromProjectionMatrix(ge),me=this.localClippingEnabled,J=ue.init(this.clippingPlanes,me),f=he.get(l,U.length),f.init(),U.push(f),Z.enabled===!0&&Z.isPresenting===!0){const j=m.xr.getDepthSensingMesh();j!==null&&Rn(j,S,-1/0,m.sortObjects)}Rn(l,S,0,m.sortObjects),f.finish(),m.sortObjects===!0&&f.sort(ve,Ae),et=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,et&&q.addToRenderList(f,l),this.info.render.frame++,J===!0&&ue.beginShadows();const w=a.state.shadowsArray;_e.render(w,l,S),J===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const y=f.opaque,T=f.transmissive;if(a.setupLights(),S.isArrayCamera){const j=S.cameras;if(T.length>0)for(let re=0,de=j.length;re<de;re++){const le=j[re];ai(y,T,l,le)}et&&q.render(l);for(let re=0,de=j.length;re<de;re++){const le=j[re];ii(f,l,le,le.viewport)}}else T.length>0&&ai(y,T,l,S),et&&q.render(l),ii(f,l,S);H!==null&&I===0&&(Le.updateMultisampleRenderTarget(H),Le.updateRenderTargetMipmap(H)),l.isScene===!0&&l.onAfterRender(m,l,S),Pe.resetDefaultState(),h=-1,d=null,A.pop(),A.length>0?(a=A[A.length-1],J===!0&&ue.setGlobalState(m.clippingPlanes,a.state.camera)):a=null,U.pop(),U.length>0?f=U[U.length-1]:f=null};function Rn(l,S,w,y){if(l.visible===!1)return;if(l.layers.test(S.layers)){if(l.isGroup)w=l.renderOrder;else if(l.isLOD)l.autoUpdate===!0&&l.update(S);else if(l.isLight)a.pushLight(l),l.castShadow&&a.pushShadow(l);else if(l.isSprite){if(!l.frustumCulled||k.intersectsSprite(l)){y&&Re.setFromMatrixPosition(l.matrixWorld).applyMatrix4(ge);const re=B.update(l),de=l.material;de.visible&&f.push(l,re,de,w,Re.z,null)}}else if((l.isMesh||l.isLine||l.isPoints)&&(!l.frustumCulled||k.intersectsObject(l))){const re=B.update(l),de=l.material;if(y&&(l.boundingSphere!==void 0?(l.boundingSphere===null&&l.computeBoundingSphere(),Re.copy(l.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),Re.copy(re.boundingSphere.center)),Re.applyMatrix4(l.matrixWorld).applyMatrix4(ge)),Array.isArray(de)){const le=re.groups;for(let be=0,Ce=le.length;be<Ce;be++){const Ee=le[be],Ie=de[Ee.materialIndex];Ie&&Ie.visible&&f.push(l,re,Ie,w,Re.z,Ee)}}else de.visible&&f.push(l,re,de,w,Re.z,null)}}const j=l.children;for(let re=0,de=j.length;re<de;re++)Rn(j[re],S,w,y)}function ii(l,S,w,y){const T=l.opaque,j=l.transmissive,re=l.transparent;a.setupLightsView(w),J===!0&&ue.setGlobalState(m.clippingPlanes,w),y&&pe.viewport(R.copy(y)),T.length>0&&on(T,S,w),j.length>0&&on(j,S,w),re.length>0&&on(re,S,w),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function ai(l,S,w,y){if((w.isScene===!0?w.overrideMaterial:null)!==null)return;a.state.transmissionRenderTarget[y.id]===void 0&&(a.state.transmissionRenderTarget[y.id]=new Kt(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?Mn:Ot,minFilter:Qt,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const j=a.state.transmissionRenderTarget[y.id],re=y.viewport||R;j.setSize(re.z*m.transmissionResolutionScale,re.w*m.transmissionResolutionScale);const de=m.getRenderTarget(),le=m.getActiveCubeFace(),be=m.getActiveMipmapLevel();m.setRenderTarget(j),m.getClearColor(Y),Q=m.getClearAlpha(),Q<1&&m.setClearColor(16777215,.5),m.clear(),et&&q.render(w);const Ce=m.toneMapping;m.toneMapping=Ct;const Ee=y.viewport;if(y.viewport!==void 0&&(y.viewport=void 0),a.setupLightsView(y),J===!0&&ue.setGlobalState(m.clippingPlanes,y),on(l,w,y),Le.updateMultisampleRenderTarget(j),Le.updateRenderTargetMipmap(j),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ze=0,it=S.length;ze<it;ze++){const qe=S[ze],Xe=qe.object,Me=qe.geometry,tt=qe.material,Oe=qe.group;if(tt.side===Rt&&Xe.layers.test(y.layers)){const mt=tt.side;tt.side=vt,tt.needsUpdate=!0,ri(Xe,w,y,Me,tt,Oe),tt.side=mt,tt.needsUpdate=!0,Ie=!0}}Ie===!0&&(Le.updateMultisampleRenderTarget(j),Le.updateRenderTargetMipmap(j))}m.setRenderTarget(de,le,be),m.setClearColor(Y,Q),Ee!==void 0&&(y.viewport=Ee),m.toneMapping=Ce}function on(l,S,w){const y=S.isScene===!0?S.overrideMaterial:null;for(let T=0,j=l.length;T<j;T++){const re=l[T],de=re.object,le=re.geometry,be=re.group;let Ce=re.material;Ce.allowOverride===!0&&y!==null&&(Ce=y),de.layers.test(w.layers)&&ri(de,S,w,le,Ce,be)}}function ri(l,S,w,y,T,j){l.onBeforeRender(m,S,w,y,T,j),l.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,l.matrixWorld),l.normalMatrix.getNormalMatrix(l.modelViewMatrix),T.onBeforeRender(m,S,w,y,l,j),T.transparent===!0&&T.side===Rt&&T.forceSinglePass===!1?(T.side=vt,T.needsUpdate=!0,m.renderBufferDirect(w,S,y,T,l,j),T.side=tn,T.needsUpdate=!0,m.renderBufferDirect(w,S,y,T,l,j),T.side=Rt):m.renderBufferDirect(w,S,y,T,l,j),l.onAfterRender(m,S,w,y,T,j)}function sn(l,S,w){S.isScene!==!0&&(S=Je);const y=Se.get(l),T=a.state.lights,j=a.state.shadowsArray,re=T.state.version,de=X.getParameters(l,T.state,j,S,w),le=X.getProgramCacheKey(de);let be=y.programs;y.environment=l.isMeshStandardMaterial?S.environment:null,y.fog=S.fog,y.envMap=(l.isMeshStandardMaterial?p:rt).get(l.envMap||y.environment),y.envMapRotation=y.environment!==null&&l.envMap===null?S.environmentRotation:l.envMapRotation,be===void 0&&(l.addEventListener("dispose",fe),be=new Map,y.programs=be);let Ce=be.get(le);if(Ce!==void 0){if(y.currentProgram===Ce&&y.lightsStateVersion===re)return si(l,de),Ce}else de.uniforms=X.getUniforms(l),l.onBeforeCompile(de,m),Ce=X.acquireProgram(de,le),be.set(le,Ce),y.uniforms=de.uniforms;const Ee=y.uniforms;return(!l.isShaderMaterial&&!l.isRawShaderMaterial||l.clipping===!0)&&(Ee.clippingPlanes=ue.uniform),si(l,de),y.needsLights=za(l),y.lightsStateVersion=re,y.needsLights&&(Ee.ambientLightColor.value=T.state.ambient,Ee.lightProbe.value=T.state.probe,Ee.directionalLights.value=T.state.directional,Ee.directionalLightShadows.value=T.state.directionalShadow,Ee.spotLights.value=T.state.spot,Ee.spotLightShadows.value=T.state.spotShadow,Ee.rectAreaLights.value=T.state.rectArea,Ee.ltc_1.value=T.state.rectAreaLTC1,Ee.ltc_2.value=T.state.rectAreaLTC2,Ee.pointLights.value=T.state.point,Ee.pointLightShadows.value=T.state.pointShadow,Ee.hemisphereLights.value=T.state.hemi,Ee.directionalShadowMap.value=T.state.directionalShadowMap,Ee.directionalShadowMatrix.value=T.state.directionalShadowMatrix,Ee.spotShadowMap.value=T.state.spotShadowMap,Ee.spotLightMatrix.value=T.state.spotLightMatrix,Ee.spotLightMap.value=T.state.spotLightMap,Ee.pointShadowMap.value=T.state.pointShadowMap,Ee.pointShadowMatrix.value=T.state.pointShadowMatrix),y.currentProgram=Ce,y.uniformsList=null,Ce}function oi(l){if(l.uniformsList===null){const S=l.currentProgram.getUniforms();l.uniformsList=gn.seqWithValue(S.seq,l.uniforms)}return l.uniformsList}function si(l,S){const w=Se.get(l);w.outputColorSpace=S.outputColorSpace,w.batching=S.batching,w.batchingColor=S.batchingColor,w.instancing=S.instancing,w.instancingColor=S.instancingColor,w.instancingMorph=S.instancingMorph,w.skinning=S.skinning,w.morphTargets=S.morphTargets,w.morphNormals=S.morphNormals,w.morphColors=S.morphColors,w.morphTargetsCount=S.morphTargetsCount,w.numClippingPlanes=S.numClippingPlanes,w.numIntersection=S.numClipIntersection,w.vertexAlphas=S.vertexAlphas,w.vertexTangents=S.vertexTangents,w.toneMapping=S.toneMapping}function Va(l,S,w,y,T){S.isScene!==!0&&(S=Je),Le.resetTextureUnits();const j=S.fog,re=y.isMeshStandardMaterial?S.environment:null,de=H===null?m.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Tn,le=(y.isMeshStandardMaterial?p:rt).get(y.envMap||re),be=y.vertexColors===!0&&!!w.attributes.color&&w.attributes.color.itemSize===4,Ce=!!w.attributes.tangent&&(!!y.normalMap||y.anisotropy>0),Ee=!!w.morphAttributes.position,Ie=!!w.morphAttributes.normal,ze=!!w.morphAttributes.color;let it=Ct;y.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(it=m.toneMapping);const qe=w.morphAttributes.position||w.morphAttributes.normal||w.morphAttributes.color,Xe=qe!==void 0?qe.length:0,Me=Se.get(y),tt=a.state.lights;if(J===!0&&(me===!0||l!==d)){const ft=l===d&&y.id===h;ue.setState(y,l,ft)}let Oe=!1;y.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==tt.state.version||Me.outputColorSpace!==de||T.isBatchedMesh&&Me.batching===!1||!T.isBatchedMesh&&Me.batching===!0||T.isBatchedMesh&&Me.batchingColor===!0&&T.colorTexture===null||T.isBatchedMesh&&Me.batchingColor===!1&&T.colorTexture!==null||T.isInstancedMesh&&Me.instancing===!1||!T.isInstancedMesh&&Me.instancing===!0||T.isSkinnedMesh&&Me.skinning===!1||!T.isSkinnedMesh&&Me.skinning===!0||T.isInstancedMesh&&Me.instancingColor===!0&&T.instanceColor===null||T.isInstancedMesh&&Me.instancingColor===!1&&T.instanceColor!==null||T.isInstancedMesh&&Me.instancingMorph===!0&&T.morphTexture===null||T.isInstancedMesh&&Me.instancingMorph===!1&&T.morphTexture!==null||Me.envMap!==le||y.fog===!0&&Me.fog!==j||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==ue.numPlanes||Me.numIntersection!==ue.numIntersection)||Me.vertexAlphas!==be||Me.vertexTangents!==Ce||Me.morphTargets!==Ee||Me.morphNormals!==Ie||Me.morphColors!==ze||Me.toneMapping!==it||Me.morphTargetsCount!==Xe)&&(Oe=!0):(Oe=!0,Me.__version=y.version);let mt=Me.currentProgram;Oe===!0&&(mt=sn(y,S,T));let Bt=!1,gt=!1,$t=!1;const je=mt.getUniforms(),Et=Me.uniforms;if(pe.useProgram(mt.program)&&(Bt=!0,gt=!0,$t=!0),y.id!==h&&(h=y.id,gt=!0),Bt||d!==l){pe.buffers.depth.getReversed()?(oe.copy(l.projectionMatrix),$a(oe),ja(oe),je.setValue(_,"projectionMatrix",oe)):je.setValue(_,"projectionMatrix",l.projectionMatrix),je.setValue(_,"viewMatrix",l.matrixWorldInverse);const ut=je.map.cameraPosition;ut!==void 0&&ut.setValue(_,Be.setFromMatrixPosition(l.matrixWorld)),Ye.logarithmicDepthBuffer&&je.setValue(_,"logDepthBufFC",2/(Math.log(l.far+1)/Math.LN2)),(y.isMeshPhongMaterial||y.isMeshToonMaterial||y.isMeshLambertMaterial||y.isMeshBasicMaterial||y.isMeshStandardMaterial||y.isShaderMaterial)&&je.setValue(_,"isOrthographic",l.isOrthographicCamera===!0),d!==l&&(d=l,gt=!0,$t=!0)}if(T.isSkinnedMesh){je.setOptional(_,T,"bindMatrix"),je.setOptional(_,T,"bindMatrixInverse");const ft=T.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),je.setValue(_,"boneTexture",ft.boneTexture,Le))}T.isBatchedMesh&&(je.setOptional(_,T,"batchingTexture"),je.setValue(_,"batchingTexture",T._matricesTexture,Le),je.setOptional(_,T,"batchingIdTexture"),je.setValue(_,"batchingIdTexture",T._indirectTexture,Le),je.setOptional(_,T,"batchingColorTexture"),T._colorsTexture!==null&&je.setValue(_,"batchingColorTexture",T._colorsTexture,Le));const St=w.morphAttributes;if((St.position!==void 0||St.normal!==void 0||St.color!==void 0)&&se.update(T,w,mt),(gt||Me.receiveShadow!==T.receiveShadow)&&(Me.receiveShadow=T.receiveShadow,je.setValue(_,"receiveShadow",T.receiveShadow)),y.isMeshGouraudMaterial&&y.envMap!==null&&(Et.envMap.value=le,Et.flipEnvMap.value=le.isCubeTexture&&le.isRenderTargetTexture===!1?-1:1),y.isMeshStandardMaterial&&y.envMap===null&&S.environment!==null&&(Et.envMapIntensity.value=S.environmentIntensity),gt&&(je.setValue(_,"toneMappingExposure",m.toneMappingExposure),Me.needsLights&&ka(Et,$t),j&&y.fog===!0&&O.refreshFogUniforms(Et,j),O.refreshMaterialUniforms(Et,y,F,ee,a.state.transmissionRenderTarget[l.id]),gn.upload(_,oi(Me),Et,Le)),y.isShaderMaterial&&y.uniformsNeedUpdate===!0&&(gn.upload(_,oi(Me),Et,Le),y.uniformsNeedUpdate=!1),y.isSpriteMaterial&&je.setValue(_,"center",T.center),je.setValue(_,"modelViewMatrix",T.modelViewMatrix),je.setValue(_,"normalMatrix",T.normalMatrix),je.setValue(_,"modelMatrix",T.matrixWorld),y.isShaderMaterial||y.isRawShaderMaterial){const ft=y.uniformsGroups;for(let ut=0,bn=ft.length;ut<bn;ut++){const Dt=ft[ut];g.update(Dt,mt),g.bind(Dt,mt)}}return mt}function ka(l,S){l.ambientLightColor.needsUpdate=S,l.lightProbe.needsUpdate=S,l.directionalLights.needsUpdate=S,l.directionalLightShadows.needsUpdate=S,l.pointLights.needsUpdate=S,l.pointLightShadows.needsUpdate=S,l.spotLights.needsUpdate=S,l.spotLightShadows.needsUpdate=S,l.rectAreaLights.needsUpdate=S,l.hemisphereLights.needsUpdate=S}function za(l){return l.isMeshLambertMaterial||l.isMeshToonMaterial||l.isMeshPhongMaterial||l.isMeshStandardMaterial||l.isShadowMaterial||l.isShaderMaterial&&l.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(l,S,w){const y=Se.get(l);y.__autoAllocateDepthBuffer=l.resolveDepthBuffer===!1,y.__autoAllocateDepthBuffer===!1&&(y.__useRenderToTexture=!1),Se.get(l.texture).__webglTexture=S,Se.get(l.depthTexture).__webglTexture=y.__autoAllocateDepthBuffer?void 0:w,y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(l,S){const w=Se.get(l);w.__webglFramebuffer=S,w.__useDefaultFramebuffer=S===void 0};const Wa=_.createFramebuffer();this.setRenderTarget=function(l,S=0,w=0){H=l,P=S,I=w;let y=!0,T=null,j=!1,re=!1;if(l){const le=Se.get(l);if(le.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(_.FRAMEBUFFER,null),y=!1;else if(le.__webglFramebuffer===void 0)Le.setupRenderTarget(l);else if(le.__hasExternalTextures)Le.rebindTextures(l,Se.get(l.texture).__webglTexture,Se.get(l.depthTexture).__webglTexture);else if(l.depthBuffer){const Ee=l.depthTexture;if(le.__boundDepthTexture!==Ee){if(Ee!==null&&Se.has(Ee)&&(l.width!==Ee.image.width||l.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Le.setupDepthRenderbuffer(l)}}const be=l.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(re=!0);const Ce=Se.get(l).__webglFramebuffer;l.isWebGLCubeRenderTarget?(Array.isArray(Ce[S])?T=Ce[S][w]:T=Ce[S],j=!0):l.samples>0&&Le.useMultisampledRTT(l)===!1?T=Se.get(l).__webglMultisampledFramebuffer:Array.isArray(Ce)?T=Ce[w]:T=Ce,R.copy(l.viewport),K.copy(l.scissor),V=l.scissorTest}else R.copy(we).multiplyScalar(F).floor(),K.copy(Ve).multiplyScalar(F).floor(),V=nt;if(w!==0&&(T=Wa),pe.bindFramebuffer(_.FRAMEBUFFER,T)&&y&&pe.drawBuffers(l,T),pe.viewport(R),pe.scissor(K),pe.setScissorTest(V),j){const le=Se.get(l.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_CUBE_MAP_POSITIVE_X+S,le.__webglTexture,w)}else if(re){const le=Se.get(l.texture),be=S;_.framebufferTextureLayer(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,le.__webglTexture,w,be)}else if(l!==null&&w!==0){const le=Se.get(l.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,le.__webglTexture,w)}h=-1},this.readRenderTargetPixels=function(l,S,w,y,T,j,re,de=0){if(!(l&&l.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let le=Se.get(l).__webglFramebuffer;if(l.isWebGLCubeRenderTarget&&re!==void 0&&(le=le[re]),le){pe.bindFramebuffer(_.FRAMEBUFFER,le);try{const be=l.textures[de],Ce=be.format,Ee=be.type;if(!Ye.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ye.textureTypeReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}S>=0&&S<=l.width-y&&w>=0&&w<=l.height-T&&(l.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+de),_.readPixels(S,w,y,T,te.convert(Ce),te.convert(Ee),j))}finally{const be=H!==null?Se.get(H).__webglFramebuffer:null;pe.bindFramebuffer(_.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(l,S,w,y,T,j,re,de=0){if(!(l&&l.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let le=Se.get(l).__webglFramebuffer;if(l.isWebGLCubeRenderTarget&&re!==void 0&&(le=le[re]),le)if(S>=0&&S<=l.width-y&&w>=0&&w<=l.height-T){pe.bindFramebuffer(_.FRAMEBUFFER,le);const be=l.textures[de],Ce=be.format,Ee=be.type;if(!Ye.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ye.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=_.createBuffer();_.bindBuffer(_.PIXEL_PACK_BUFFER,Ie),_.bufferData(_.PIXEL_PACK_BUFFER,j.byteLength,_.STREAM_READ),l.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+de),_.readPixels(S,w,y,T,te.convert(Ce),te.convert(Ee),0);const ze=H!==null?Se.get(H).__webglFramebuffer:null;pe.bindFramebuffer(_.FRAMEBUFFER,ze);const it=_.fenceSync(_.SYNC_GPU_COMMANDS_COMPLETE,0);return _.flush(),await Qa(_,it,4),_.bindBuffer(_.PIXEL_PACK_BUFFER,Ie),_.getBufferSubData(_.PIXEL_PACK_BUFFER,0,j),_.deleteBuffer(Ie),_.deleteSync(it),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(l,S=null,w=0){const y=Math.pow(2,-w),T=Math.floor(l.image.width*y),j=Math.floor(l.image.height*y),re=S!==null?S.x:0,de=S!==null?S.y:0;Le.setTexture2D(l,0),_.copyTexSubImage2D(_.TEXTURE_2D,w,0,0,re,de,T,j),pe.unbindTexture()};const Xa=_.createFramebuffer(),Ya=_.createFramebuffer();this.copyTextureToTexture=function(l,S,w=null,y=null,T=0,j=null){j===null&&(T!==0?(pn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=T,T=0):j=0);let re,de,le,be,Ce,Ee,Ie,ze,it;const qe=l.isCompressedTexture?l.mipmaps[j]:l.image;if(w!==null)re=w.max.x-w.min.x,de=w.max.y-w.min.y,le=w.isBox3?w.max.z-w.min.z:1,be=w.min.x,Ce=w.min.y,Ee=w.isBox3?w.min.z:0;else{const St=Math.pow(2,-T);re=Math.floor(qe.width*St),de=Math.floor(qe.height*St),l.isDataArrayTexture?le=qe.depth:l.isData3DTexture?le=Math.floor(qe.depth*St):le=1,be=0,Ce=0,Ee=0}y!==null?(Ie=y.x,ze=y.y,it=y.z):(Ie=0,ze=0,it=0);const Xe=te.convert(S.format),Me=te.convert(S.type);let tt;S.isData3DTexture?(Le.setTexture3D(S,0),tt=_.TEXTURE_3D):S.isDataArrayTexture||S.isCompressedArrayTexture?(Le.setTexture2DArray(S,0),tt=_.TEXTURE_2D_ARRAY):(Le.setTexture2D(S,0),tt=_.TEXTURE_2D),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,S.flipY),_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),_.pixelStorei(_.UNPACK_ALIGNMENT,S.unpackAlignment);const Oe=_.getParameter(_.UNPACK_ROW_LENGTH),mt=_.getParameter(_.UNPACK_IMAGE_HEIGHT),Bt=_.getParameter(_.UNPACK_SKIP_PIXELS),gt=_.getParameter(_.UNPACK_SKIP_ROWS),$t=_.getParameter(_.UNPACK_SKIP_IMAGES);_.pixelStorei(_.UNPACK_ROW_LENGTH,qe.width),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,qe.height),_.pixelStorei(_.UNPACK_SKIP_PIXELS,be),_.pixelStorei(_.UNPACK_SKIP_ROWS,Ce),_.pixelStorei(_.UNPACK_SKIP_IMAGES,Ee);const je=l.isDataArrayTexture||l.isData3DTexture,Et=S.isDataArrayTexture||S.isData3DTexture;if(l.isDepthTexture){const St=Se.get(l),ft=Se.get(S),ut=Se.get(St.__renderTarget),bn=Se.get(ft.__renderTarget);pe.bindFramebuffer(_.READ_FRAMEBUFFER,ut.__webglFramebuffer),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,bn.__webglFramebuffer);for(let Dt=0;Dt<le;Dt++)je&&(_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,Se.get(l).__webglTexture,T,Ee+Dt),_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,Se.get(S).__webglTexture,j,it+Dt)),_.blitFramebuffer(be,Ce,re,de,Ie,ze,re,de,_.DEPTH_BUFFER_BIT,_.NEAREST);pe.bindFramebuffer(_.READ_FRAMEBUFFER,null),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else if(T!==0||l.isRenderTargetTexture||Se.has(l)){const St=Se.get(l),ft=Se.get(S);pe.bindFramebuffer(_.READ_FRAMEBUFFER,Xa),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,Ya);for(let ut=0;ut<le;ut++)je?_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,St.__webglTexture,T,Ee+ut):_.framebufferTexture2D(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,St.__webglTexture,T),Et?_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,ft.__webglTexture,j,it+ut):_.framebufferTexture2D(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,ft.__webglTexture,j),T!==0?_.blitFramebuffer(be,Ce,re,de,Ie,ze,re,de,_.COLOR_BUFFER_BIT,_.NEAREST):Et?_.copyTexSubImage3D(tt,j,Ie,ze,it+ut,be,Ce,re,de):_.copyTexSubImage2D(tt,j,Ie,ze,be,Ce,re,de);pe.bindFramebuffer(_.READ_FRAMEBUFFER,null),pe.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else Et?l.isDataTexture||l.isData3DTexture?_.texSubImage3D(tt,j,Ie,ze,it,re,de,le,Xe,Me,qe.data):S.isCompressedArrayTexture?_.compressedTexSubImage3D(tt,j,Ie,ze,it,re,de,le,Xe,qe.data):_.texSubImage3D(tt,j,Ie,ze,it,re,de,le,Xe,Me,qe):l.isDataTexture?_.texSubImage2D(_.TEXTURE_2D,j,Ie,ze,re,de,Xe,Me,qe.data):l.isCompressedTexture?_.compressedTexSubImage2D(_.TEXTURE_2D,j,Ie,ze,qe.width,qe.height,Xe,qe.data):_.texSubImage2D(_.TEXTURE_2D,j,Ie,ze,re,de,Xe,Me,qe);_.pixelStorei(_.UNPACK_ROW_LENGTH,Oe),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,mt),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Bt),_.pixelStorei(_.UNPACK_SKIP_ROWS,gt),_.pixelStorei(_.UNPACK_SKIP_IMAGES,$t),j===0&&S.generateMipmaps&&_.generateMipmap(tt),pe.unbindTexture()},this.copyTextureToTexture3D=function(l,S,w=null,y=null,T=0){return pn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(l,S,w,y,T)},this.initRenderTarget=function(l){Se.get(l).__webglFramebuffer===void 0&&Le.setupRenderTarget(l)},this.initTexture=function(l){l.isCubeTexture?Le.setTextureCube(l,0):l.isData3DTexture?Le.setTexture3D(l,0):l.isDataArrayTexture||l.isCompressedArrayTexture?Le.setTexture2DArray(l,0):Le.setTexture2D(l,0),pe.unbindTexture()},this.resetState=function(){P=0,I=0,H=null,pe.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ja}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(n),t.unpackColorSpace=at._getUnpackColorSpace()}}const ha={type:"change"},ei={type:"start"},Ga={type:"end"},un=new vo,_a=new Ma,od=Math.cos(70*Eo.DEG2RAD),ot=new ye,pt=2*Math.PI,We={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gn=1e-6;class Md extends go{constructor(n,t=null){super(n,t),this.state=We.NONE,this.target=new ye,this.cursor=new ye,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xt.ROTATE,MIDDLE:Xt.DOLLY,RIGHT:Xt.PAN},this.touches={ONE:zt.ROTATE,TWO:zt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new ye,this._lastQuaternion=new Vi,this._lastTargetPosition=new ye,this._quat=new Vi().setFromUnitVectors(n.up,new ye(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ki,this._sphericalDelta=new ki,this._scale=1,this._panOffset=new ye,this._rotateStart=new $e,this._rotateEnd=new $e,this._rotateDelta=new $e,this._panStart=new $e,this._panEnd=new $e,this._panDelta=new $e,this._dollyStart=new $e,this._dollyEnd=new $e,this._dollyDelta=new $e,this._dollyDirection=new ye,this._mouse=new $e,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ld.bind(this),this._onPointerDown=sd.bind(this),this._onPointerUp=cd.bind(this),this._onContextMenu=md.bind(this),this._onMouseWheel=ud.bind(this),this._onKeyDown=pd.bind(this),this._onTouchStart=hd.bind(this),this._onTouchMove=_d.bind(this),this._onMouseDown=fd.bind(this),this._onMouseMove=dd.bind(this),this._interceptControlDown=gd.bind(this),this._interceptControlUp=vd.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ha),this.update(),this.state=We.NONE}update(n=null){const t=this.object.position;ot.copy(t).sub(this.target),ot.applyQuaternion(this._quat),this._spherical.setFromVector3(ot),this.autoRotate&&this.state===We.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=pt:i>Math.PI&&(i-=pt),s<-Math.PI?s+=pt:s>Math.PI&&(s-=pt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const u=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=u!=this._spherical.radius}if(ot.setFromSpherical(this._spherical),ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let u=null;if(this.object.isPerspectiveCamera){const c=ot.length();u=this._clampDistance(c*this._scale);const b=c-u;this.object.position.addScaledVector(this._dollyDirection,b),this.object.updateMatrixWorld(),o=!!b}else if(this.object.isOrthographicCamera){const c=new ye(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const b=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=b!==this.object.zoom;const E=new ye(this._mouse.x,this._mouse.y,0);E.unproject(this.object),this.object.position.sub(E).add(c),this.object.updateMatrixWorld(),u=ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;u!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(u).add(this.object.position):(un.origin.copy(this.object.position),un.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(un.direction))<od?this.object.lookAt(this.target):(_a.setFromNormalAndCoplanarPoint(this.object.up,this.target),un.intersectPlane(_a,this.target))))}else if(this.object.isOrthographicCamera){const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),u!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>Gn||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gn||this._lastTargetPosition.distanceToSquared(this.target)>Gn?(this.dispatchEvent(ha),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?pt/60*this.autoRotateSpeed*n:pt/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){ot.setFromMatrixColumn(t,0),ot.multiplyScalar(-n),this._panOffset.add(ot)}_panUp(n,t){this.screenSpacePanning===!0?ot.setFromMatrixColumn(t,1):(ot.setFromMatrixColumn(t,0),ot.crossVectors(this.object.up,ot)),ot.multiplyScalar(n),this._panOffset.add(ot)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ot.copy(s).sub(this.target);let o=ot.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*o/i.clientHeight,this.object.matrix),this._panUp(2*t*o/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=n-i.left,o=t-i.top,u=i.width,c=i.height;this._mouse.x=s/u*2-1,this._mouse.y=-(o/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(pt*this._rotateDelta.x/t.clientHeight),this._rotateUp(pt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,s=n.pageY-t.y,o=Math.sqrt(i*i+s*s);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),s=.5*(n.pageX+i.x),o=.5*(n.pageY+i.y);this._rotateEnd.set(s,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(pt*this._rotateDelta.x/t.clientHeight),this._rotateUp(pt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,s=n.pageY-t.y,o=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const u=(n.pageX+t.x)*.5,c=(n.pageY+t.y)*.5;this._updateZoomParameters(u,c)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new $e,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function sd(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function ld(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function cd(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ga),this.state=We.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function fd(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case Xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=We.DOLLY;break;case Xt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=We.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=We.ROTATE}break;case Xt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=We.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=We.PAN}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(ei)}function dd(e){switch(this.state){case We.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case We.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case We.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function ud(e){this.enabled===!1||this.enableZoom===!1||this.state!==We.NONE||(e.preventDefault(),this.dispatchEvent(ei),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Ga))}function pd(e){this.enabled!==!1&&this._handleKeyDown(e)}function hd(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case zt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=We.TOUCH_ROTATE;break;case zt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=We.TOUCH_PAN;break;default:this.state=We.NONE}break;case 2:switch(this.touches.TWO){case zt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=We.TOUCH_DOLLY_PAN;break;case zt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=We.TOUCH_DOLLY_ROTATE;break;default:this.state=We.NONE}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(ei)}function _d(e){switch(this._trackPointer(e),this.state){case We.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case We.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case We.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case We.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=We.NONE}}function md(e){this.enabled!==!1&&e.preventDefault()}function gd(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function vd(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Td extends So{constructor(){super();const n=new jn;n.deleteAttribute("uv");const t=new zi({side:vt}),i=new zi,s=new Mo(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const o=new dt(n,t);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const u=new To(n,i,6),c=new xo;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),u.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),u.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),u.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),u.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),u.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),u.setMatrixAt(5,c.matrix),this.add(u);const b=new dt(n,Gt(50));b.position.set(-16.116,14.37,8.208),b.scale.set(.1,2.428,2.739),this.add(b);const E=new dt(n,Gt(50));E.position.set(-16.109,18.021,-8.207),E.scale.set(.1,2.425,2.751),this.add(E);const L=new dt(n,Gt(17));L.position.set(14.904,12.198,-1.832),L.scale.set(.15,4.265,6.331),this.add(L);const M=new dt(n,Gt(43));M.position.set(-.462,8.89,14.52),M.scale.set(4.38,5.441,.088),this.add(M);const v=new dt(n,Gt(20));v.position.set(3.235,11.486,-12.541),v.scale.set(2.5,2,.1),this.add(v);const x=new dt(n,Gt(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const n=new Set;this.traverse(t=>{t.isMesh&&(n.add(t.geometry),n.add(t.material))});for(const t of n)t.dispose()}}function Gt(e){const n=new ga;return n.color.setScalar(e),n}export{Md as O,Ki as P,Td as R,Sd as W};
