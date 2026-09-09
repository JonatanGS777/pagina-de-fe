import{c as qr,N as Ct,S as Zr,C as Qe,F as vr,V as ye,R as $r,a as mt,w as hn,M as Yt,W as Kt,b as rt,L as Qt,H as Mn,U as Ot,D as Rt,B as vt,d as nn,t as jr,e as Qr,f as Tn,p as Jr,g as ea,h as rn,i as qt,j as dt,O as ta,P as mn,k as Er,l as jn,E as na,m as $e,A as ia,n as Cn,o as bt,q as vn,r as Qn,s as an,u as on,v as Sr,x as ra,y as Ft,z as Nt,G as xn,I as Jn,J as en,K as kt,Q as Vt,T as En,X as aa,Y as oa,Z as jt,_ as sa,$ as la,a0 as ca,a1 as fa,a2 as da,a3 as ua,a4 as pa,a5 as ha,a6 as ma,a7 as _a,a8 as ga,a9 as va,aa as Ea,ab as Sa,ac as Ma,ad as Ta,ae as xa,af as Aa,ag as Pn,ah as cn,ai as Ra,aj as tn,ak as ba,al as Ca,am as Pa,an as Da,ao as Mr,ap as La,aq as Ua,ar as wa,as as Tr,at as Fe,au as ya,av as Ia,aw as Na,ax as xr,ay as At,az as Sn,aA as Ar,aB as Rr,aC as br,aD as Cr,aE as Oa,aF as Fa,aG as Ba,aH as Pr,aI as It,aJ as Ha,aK as Ga,aL as Va,aM as Dr,aN as ka,aO as Lr,aP as Ur,aQ as Dn,aR as Ln,aS as Un,aT as wn,aU as Ze,aV as ci,aW as fi,aX as di,aY as ui,aZ as pi,a_ as hi,a$ as mi,b0 as _i,b1 as gi,b2 as vi,b3 as Ei,b4 as Si,b5 as Mi,b6 as Ti,b7 as xi,b8 as Ai,b9 as Ri,ba as bi,bb as Ci,bc as Pi,bd as Di,be as yn,bf as Li,bg as Ui,bh as za,bi as wi,bj as yi,bk as Ii,bl as Vn,bm as kn,bn as zn,bo as Wn,bp as Xn,bq as Yn,br as Kn,bs as Wa,bt as Ni,bu as Xa,bv as _n,bw as Ya,bx as Oi,by as Fi,bz as Bi,bA as qn,bB as Zn,bC as Ka,bD as wr,bE as qa,bF as Za,bG as $a,bH as yr,bI as Hi,bJ as Ir,bK as Gi,bL as Nr,bM as ja,bN as Qa,bO as Ja,bP as Vi,bQ as ht,bR as eo,bS as to,bT as no,bU as io,bV as ro,bW as ao,bX as oo,bY as so,bZ as lo,b_ as co,b$ as fo,c0 as uo,c1 as po,c2 as ho,c3 as mo,c4 as _o,c5 as go,c6 as vo,c7 as Xt,c8 as zt,c9 as ki,ca as zi,cb as Eo,cc as So,cd as Mo,ce as Wi,cf as To,cg as xo,ch as Ao}from"./three-core-BdTzjfzw.js";/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Or(){let e=null,n=!1,t=null,i=null;function s(a,u){t(a,u),i=e.requestAnimationFrame(s)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(s),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(a){t=a},setContext:function(a){e=a}}}function Ro(e){const n=new WeakMap;function t(c,x){const M=c.array,T=c.usage,E=M.byteLength,g=e.createBuffer();e.bindBuffer(x,g),e.bufferData(x,M,T),c.onUploadCallback();let _;if(M instanceof Float32Array)_=e.FLOAT;else if(typeof Float16Array<"u"&&M instanceof Float16Array)_=e.HALF_FLOAT;else if(M instanceof Uint16Array)c.isFloat16BufferAttribute?_=e.HALF_FLOAT:_=e.UNSIGNED_SHORT;else if(M instanceof Int16Array)_=e.SHORT;else if(M instanceof Uint32Array)_=e.UNSIGNED_INT;else if(M instanceof Int32Array)_=e.INT;else if(M instanceof Int8Array)_=e.BYTE;else if(M instanceof Uint8Array)_=e.UNSIGNED_BYTE;else if(M instanceof Uint8ClampedArray)_=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+M);return{buffer:g,type:_,bytesPerElement:M.BYTES_PER_ELEMENT,version:c.version,size:E}}function i(c,x,M){const T=x.array,E=x.updateRanges;if(e.bindBuffer(M,c),E.length===0)e.bufferSubData(M,0,T);else{E.sort((_,N)=>_.start-N.start);let g=0;for(let _=1;_<E.length;_++){const N=E[g],P=E[_];P.start<=N.start+N.count+1?N.count=Math.max(N.count,P.start+P.count-N.start):(++g,E[g]=P)}E.length=g+1;for(let _=0,N=E.length;_<N;_++){const P=E[_];e.bufferSubData(M,P.start*T.BYTES_PER_ELEMENT,T,P.start,P.count)}x.clearUpdateRanges()}x.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const x=n.get(c);x&&(e.deleteBuffer(x.buffer),n.delete(c))}function u(c,x){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const T=n.get(c);(!T||T.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const M=n.get(c);if(M===void 0)n.set(c,t(c,x));else if(M.version<c.version){if(M.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(M.buffer,c,x),M.version=c.version}}return{get:s,remove:a,update:u}}var bo=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Co=`#ifdef USE_ALPHAHASH
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
#endif`,Po=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Do=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lo=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uo=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wo=`#ifdef USE_AOMAP
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
#endif`,yo=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Io=`#ifdef USE_BATCHING
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
#endif`,No=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Oo=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fo=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bo=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ho=`#ifdef USE_IRIDESCENCE
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
#endif`,Go=`#ifdef USE_BUMPMAP
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
#endif`,Vo=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ko=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wo=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xo=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ko=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qo=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Zo=`#define PI 3.141592653589793
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
} // validated`,$o=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jo=`vec3 transformedNormal = objectNormal;
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
#endif`,Qo=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jo=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,es=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ts=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ns="gl_FragColor = linearToOutputTexel( gl_FragColor );",is=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rs=`#ifdef USE_ENVMAP
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
	
#endif`,os=`#ifdef USE_ENVMAP
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
#endif`,ss=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ls=`#ifdef USE_ENVMAP
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
#endif`,cs=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fs=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ds=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,us=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ps=`#ifdef USE_GRADIENTMAP
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
}`,hs=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ms=`LambertMaterial material;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gs=`uniform bool receiveShadow;
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
#endif`,vs=`#ifdef USE_ENVMAP
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
#endif`,Es=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ss=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ms=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ts=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xs=`PhysicalMaterial material;
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
#endif`,As=`struct PhysicalMaterial {
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
}`,Rs=`
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
#endif`,bs=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cs=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ps=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ds=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ls=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Us=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ws=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ys=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Is=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ns=`#if defined( USE_POINTS_UV )
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
#endif`,Os=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fs=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bs=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hs=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gs=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vs=`#ifdef USE_MORPHTARGETS
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
#endif`,ks=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zs=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ws=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Xs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ys=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ks=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qs=`#ifdef USE_NORMALMAP
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
#endif`,Zs=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$s=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,js=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qs=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Js=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,el=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tl=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,il=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rl=`#ifdef DITHERING
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
#endif`,ol=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sl=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ll=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cl=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,fl=`float getShadowMask() {
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
}`,dl=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ul=`#ifdef USE_SKINNING
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
#endif`,pl=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hl=`#ifdef USE_SKINNING
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
#endif`,ml=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_l=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gl=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vl=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,El=`#ifdef USE_TRANSMISSION
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
#endif`,Sl=`#ifdef USE_TRANSMISSION
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
#endif`,Ml=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Al=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rl=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bl=`uniform sampler2D t2D;
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
}`,Cl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pl=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Dl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ll=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ul=`#include <common>
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
}`,wl=`#if DEPTH_PACKING == 3200
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
}`,yl=`#define DISTANCE
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
}`,Il=`#define DISTANCE
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
}`,Nl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ol=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fl=`uniform float scale;
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
}`,Bl=`uniform vec3 diffuse;
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
}`,Hl=`#include <common>
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
}`,Gl=`uniform vec3 diffuse;
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
}`,Vl=`#define LAMBERT
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
}`,kl=`#define LAMBERT
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
}`,zl=`#define MATCAP
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
}`,Wl=`#define MATCAP
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
}`,Xl=`#define NORMAL
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
}`,Yl=`#define NORMAL
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
}`,Kl=`#define PHONG
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
}`,ql=`#define PHONG
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
}`,Zl=`#define STANDARD
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
}`,$l=`#define STANDARD
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
}`,jl=`#define TOON
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
}`,Ql=`#define TOON
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
}`,Jl=`uniform float size;
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
}`,ec=`uniform vec3 diffuse;
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
}`,tc=`#include <common>
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
}`,nc=`uniform vec3 color;
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
}`,ic=`uniform float rotation;
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
}`,rc=`uniform vec3 diffuse;
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
}`,Ue={alphahash_fragment:bo,alphahash_pars_fragment:Co,alphamap_fragment:Po,alphamap_pars_fragment:Do,alphatest_fragment:Lo,alphatest_pars_fragment:Uo,aomap_fragment:wo,aomap_pars_fragment:yo,batching_pars_vertex:Io,batching_vertex:No,begin_vertex:Oo,beginnormal_vertex:Fo,bsdfs:Bo,iridescence_fragment:Ho,bumpmap_pars_fragment:Go,clipping_planes_fragment:Vo,clipping_planes_pars_fragment:ko,clipping_planes_pars_vertex:zo,clipping_planes_vertex:Wo,color_fragment:Xo,color_pars_fragment:Yo,color_pars_vertex:Ko,color_vertex:qo,common:Zo,cube_uv_reflection_fragment:$o,defaultnormal_vertex:jo,displacementmap_pars_vertex:Qo,displacementmap_vertex:Jo,emissivemap_fragment:es,emissivemap_pars_fragment:ts,colorspace_fragment:ns,colorspace_pars_fragment:is,envmap_fragment:rs,envmap_common_pars_fragment:as,envmap_pars_fragment:os,envmap_pars_vertex:ss,envmap_physical_pars_fragment:vs,envmap_vertex:ls,fog_vertex:cs,fog_pars_vertex:fs,fog_fragment:ds,fog_pars_fragment:us,gradientmap_pars_fragment:ps,lightmap_pars_fragment:hs,lights_lambert_fragment:ms,lights_lambert_pars_fragment:_s,lights_pars_begin:gs,lights_toon_fragment:Es,lights_toon_pars_fragment:Ss,lights_phong_fragment:Ms,lights_phong_pars_fragment:Ts,lights_physical_fragment:xs,lights_physical_pars_fragment:As,lights_fragment_begin:Rs,lights_fragment_maps:bs,lights_fragment_end:Cs,logdepthbuf_fragment:Ps,logdepthbuf_pars_fragment:Ds,logdepthbuf_pars_vertex:Ls,logdepthbuf_vertex:Us,map_fragment:ws,map_pars_fragment:ys,map_particle_fragment:Is,map_particle_pars_fragment:Ns,metalnessmap_fragment:Os,metalnessmap_pars_fragment:Fs,morphinstance_vertex:Bs,morphcolor_vertex:Hs,morphnormal_vertex:Gs,morphtarget_pars_vertex:Vs,morphtarget_vertex:ks,normal_fragment_begin:zs,normal_fragment_maps:Ws,normal_pars_fragment:Xs,normal_pars_vertex:Ys,normal_vertex:Ks,normalmap_pars_fragment:qs,clearcoat_normal_fragment_begin:Zs,clearcoat_normal_fragment_maps:$s,clearcoat_pars_fragment:js,iridescence_pars_fragment:Qs,opaque_fragment:Js,packing:el,premultiplied_alpha_fragment:tl,project_vertex:nl,dithering_fragment:il,dithering_pars_fragment:rl,roughnessmap_fragment:al,roughnessmap_pars_fragment:ol,shadowmap_pars_fragment:sl,shadowmap_pars_vertex:ll,shadowmap_vertex:cl,shadowmask_pars_fragment:fl,skinbase_vertex:dl,skinning_pars_vertex:ul,skinning_vertex:pl,skinnormal_vertex:hl,specularmap_fragment:ml,specularmap_pars_fragment:_l,tonemapping_fragment:gl,tonemapping_pars_fragment:vl,transmission_fragment:El,transmission_pars_fragment:Sl,uv_pars_fragment:Ml,uv_pars_vertex:Tl,uv_vertex:xl,worldpos_vertex:Al,background_vert:Rl,background_frag:bl,backgroundCube_vert:Cl,backgroundCube_frag:Pl,cube_vert:Dl,cube_frag:Ll,depth_vert:Ul,depth_frag:wl,distanceRGBA_vert:yl,distanceRGBA_frag:Il,equirect_vert:Nl,equirect_frag:Ol,linedashed_vert:Fl,linedashed_frag:Bl,meshbasic_vert:Hl,meshbasic_frag:Gl,meshlambert_vert:Vl,meshlambert_frag:kl,meshmatcap_vert:zl,meshmatcap_frag:Wl,meshnormal_vert:Xl,meshnormal_frag:Yl,meshphong_vert:Kl,meshphong_frag:ql,meshphysical_vert:Zl,meshphysical_frag:$l,meshtoon_vert:jl,meshtoon_frag:Ql,points_vert:Jl,points_frag:ec,shadow_vert:tc,shadow_frag:nc,sprite_vert:ic,sprite_frag:rc},ne={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},Tt={basic:{uniforms:ht([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:ht([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:ht([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:ht([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:ht([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:ht([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:ht([ne.points,ne.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:ht([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:ht([ne.common,ne.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:ht([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:ht([ne.sprite,ne.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:ht([ne.common,ne.displacementmap,{referencePosition:{value:new ye},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:ht([ne.lights,ne.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Tt.physical={uniforms:ht([Tt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const fn={r:0,b:0,g:0},Lt=new Ir,ac=new Yt;function oc(e,n,t,i,s,a,u){const c=new Qe(0);let x=a===!0?0:1,M,T,E=null,g=0,_=null;function N(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?t:n).get(v)),v}function P(b){let v=!1;const G=N(b);G===null?r(c,x):G&&G.isColor&&(r(G,1),v=!0);const L=e.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,u):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,u),(e.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function f(b,v){const G=N(v);G&&(G.isCubeTexture||G.mapping===xn)?(T===void 0&&(T=new dt(new jn(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:Hi(Tt.backgroundCube.uniforms),vertexShader:Tt.backgroundCube.vertexShader,fragmentShader:Tt.backgroundCube.fragmentShader,side:vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),T.geometry.deleteAttribute("normal"),T.geometry.deleteAttribute("uv"),T.onBeforeRender=function(L,I,H){this.matrixWorld.copyPosition(H.matrixWorld)},Object.defineProperty(T.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(T)),Lt.copy(v.backgroundRotation),Lt.x*=-1,Lt.y*=-1,Lt.z*=-1,G.isCubeTexture&&G.isRenderTargetTexture===!1&&(Lt.y*=-1,Lt.z*=-1),T.material.uniforms.envMap.value=G,T.material.uniforms.flipEnvMap.value=G.isCubeTexture&&G.isRenderTargetTexture===!1?-1:1,T.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,T.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,T.material.uniforms.backgroundRotation.value.setFromMatrix4(ac.makeRotationFromEuler(Lt)),T.material.toneMapped=rt.getTransfer(G.colorSpace)!==Ze,(E!==G||g!==G.version||_!==e.toneMapping)&&(T.material.needsUpdate=!0,E=G,g=G.version,_=e.toneMapping),T.layers.enableAll(),b.unshift(T,T.geometry,T.material,0,0,null)):G&&G.isTexture&&(M===void 0&&(M=new dt(new Cr(2,2),new Ft({name:"BackgroundMaterial",uniforms:Hi(Tt.background.uniforms),vertexShader:Tt.background.vertexShader,fragmentShader:Tt.background.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),M.geometry.deleteAttribute("normal"),Object.defineProperty(M.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(M)),M.material.uniforms.t2D.value=G,M.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,M.material.toneMapped=rt.getTransfer(G.colorSpace)!==Ze,G.matrixAutoUpdate===!0&&G.updateMatrix(),M.material.uniforms.uvTransform.value.copy(G.matrix),(E!==G||g!==G.version||_!==e.toneMapping)&&(M.material.needsUpdate=!0,E=G,g=G.version,_=e.toneMapping),M.layers.enableAll(),b.unshift(M,M.geometry,M.material,0,0,null))}function r(b,v){b.getRGB(fn,yr(e)),i.buffers.color.setClear(fn.r,fn.g,fn.b,v,u)}function U(){T!==void 0&&(T.geometry.dispose(),T.material.dispose(),T=void 0),M!==void 0&&(M.geometry.dispose(),M.material.dispose(),M=void 0)}return{getClearColor:function(){return c},setClearColor:function(b,v=1){c.set(b),x=v,r(c,x)},getClearAlpha:function(){return x},setClearAlpha:function(b){x=b,r(c,x)},render:P,addToRenderList:f,dispose:U}}function sc(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=g(null);let a=s,u=!1;function c(d,C,K,V,Y){let Q=!1;const W=E(V,K,C);a!==W&&(a=W,M(a.object)),Q=_(d,V,K,Y),Q&&N(d,V,K,Y),Y!==null&&n.update(Y,e.ELEMENT_ARRAY_BUFFER),(Q||u)&&(u=!1,v(d,C,K,V),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Y).buffer))}function x(){return e.createVertexArray()}function M(d){return e.bindVertexArray(d)}function T(d){return e.deleteVertexArray(d)}function E(d,C,K){const V=K.wireframe===!0;let Y=i[d.id];Y===void 0&&(Y={},i[d.id]=Y);let Q=Y[C.id];Q===void 0&&(Q={},Y[C.id]=Q);let W=Q[V];return W===void 0&&(W=g(x()),Q[V]=W),W}function g(d){const C=[],K=[],V=[];for(let Y=0;Y<t;Y++)C[Y]=0,K[Y]=0,V[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:K,attributeDivisors:V,object:d,attributes:{},index:null}}function _(d,C,K,V){const Y=a.attributes,Q=C.attributes;let W=0;const ee=K.getAttributes();for(const F in ee)if(ee[F].location>=0){const Ae=Y[F];let we=Q[F];if(we===void 0&&(F==="instanceMatrix"&&d.instanceMatrix&&(we=d.instanceMatrix),F==="instanceColor"&&d.instanceColor&&(we=d.instanceColor)),Ae===void 0||Ae.attribute!==we||we&&Ae.data!==we.data)return!0;W++}return a.attributesNum!==W||a.index!==V}function N(d,C,K,V){const Y={},Q=C.attributes;let W=0;const ee=K.getAttributes();for(const F in ee)if(ee[F].location>=0){let Ae=Q[F];Ae===void 0&&(F==="instanceMatrix"&&d.instanceMatrix&&(Ae=d.instanceMatrix),F==="instanceColor"&&d.instanceColor&&(Ae=d.instanceColor));const we={};we.attribute=Ae,Ae&&Ae.data&&(we.data=Ae.data),Y[F]=we,W++}a.attributes=Y,a.attributesNum=W,a.index=V}function P(){const d=a.newAttributes;for(let C=0,K=d.length;C<K;C++)d[C]=0}function f(d){r(d,0)}function r(d,C){const K=a.newAttributes,V=a.enabledAttributes,Y=a.attributeDivisors;K[d]=1,V[d]===0&&(e.enableVertexAttribArray(d),V[d]=1),Y[d]!==C&&(e.vertexAttribDivisor(d,C),Y[d]=C)}function U(){const d=a.newAttributes,C=a.enabledAttributes;for(let K=0,V=C.length;K<V;K++)C[K]!==d[K]&&(e.disableVertexAttribArray(K),C[K]=0)}function b(d,C,K,V,Y,Q,W){W===!0?e.vertexAttribIPointer(d,C,K,Y,Q):e.vertexAttribPointer(d,C,K,V,Y,Q)}function v(d,C,K,V){P();const Y=V.attributes,Q=K.getAttributes(),W=C.defaultAttributeValues;for(const ee in Q){const F=Q[ee];if(F.location>=0){let ve=Y[ee];if(ve===void 0&&(ee==="instanceMatrix"&&d.instanceMatrix&&(ve=d.instanceMatrix),ee==="instanceColor"&&d.instanceColor&&(ve=d.instanceColor)),ve!==void 0){const Ae=ve.normalized,we=ve.itemSize,Ve=n.get(ve);if(Ve===void 0)continue;const nt=Ve.buffer,k=Ve.type,J=Ve.bytesPerElement,_e=k===e.INT||k===e.UNSIGNED_INT||ve.gpuType===Pr;if(ve.isInterleavedBufferAttribute){const oe=ve.data,ge=oe.stride,Be=ve.offset;if(oe.isInstancedInterleavedBuffer){for(let Re=0;Re<F.locationSize;Re++)r(F.location+Re,oe.meshPerAttribute);d.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Re=0;Re<F.locationSize;Re++)f(F.location+Re);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let Re=0;Re<F.locationSize;Re++)b(F.location+Re,we/F.locationSize,k,Ae,ge*J,(Be+we/F.locationSize*Re)*J,_e)}else{if(ve.isInstancedBufferAttribute){for(let oe=0;oe<F.locationSize;oe++)r(F.location+oe,ve.meshPerAttribute);d.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let oe=0;oe<F.locationSize;oe++)f(F.location+oe);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let oe=0;oe<F.locationSize;oe++)b(F.location+oe,we/F.locationSize,k,Ae,we*J,we/F.locationSize*oe*J,_e)}}else if(W!==void 0){const Ae=W[ee];if(Ae!==void 0)switch(Ae.length){case 2:e.vertexAttrib2fv(F.location,Ae);break;case 3:e.vertexAttrib3fv(F.location,Ae);break;case 4:e.vertexAttrib4fv(F.location,Ae);break;default:e.vertexAttrib1fv(F.location,Ae)}}}}U()}function G(){H();for(const d in i){const C=i[d];for(const K in C){const V=C[K];for(const Y in V)T(V[Y].object),delete V[Y];delete C[K]}delete i[d]}}function L(d){if(i[d.id]===void 0)return;const C=i[d.id];for(const K in C){const V=C[K];for(const Y in V)T(V[Y].object),delete V[Y];delete C[K]}delete i[d.id]}function I(d){for(const C in i){const K=i[C];if(K[d.id]===void 0)continue;const V=K[d.id];for(const Y in V)T(V[Y].object),delete V[Y];delete K[d.id]}}function H(){h(),u=!0,a!==s&&(a=s,M(a.object))}function h(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:H,resetDefaultState:h,dispose:G,releaseStatesOfGeometry:L,releaseStatesOfProgram:I,initAttributes:P,enableAttribute:f,disableUnusedAttributes:U}}function lc(e,n,t){let i;function s(M){i=M}function a(M,T){e.drawArrays(i,M,T),t.update(T,i,1)}function u(M,T,E){E!==0&&(e.drawArraysInstanced(i,M,T,E),t.update(T,i,E))}function c(M,T,E){if(E===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,M,0,T,0,E);let _=0;for(let N=0;N<E;N++)_+=T[N];t.update(_,i,1)}function x(M,T,E,g){if(E===0)return;const _=n.get("WEBGL_multi_draw");if(_===null)for(let N=0;N<M.length;N++)u(M[N],T[N],g[N]);else{_.multiDrawArraysInstancedWEBGL(i,M,0,T,0,g,0,E);let N=0;for(let P=0;P<E;P++)N+=T[P]*g[P];t.update(N,i,1)}}this.setMode=s,this.render=a,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=x}function cc(e,n,t,i){let s;function a(){if(s!==void 0)return s;if(n.has("EXT_texture_filter_anisotropic")===!0){const I=n.get("EXT_texture_filter_anisotropic");s=e.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function u(I){return!(I!==bt&&i.convert(I)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(I){const H=I===Mn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(I!==Ot&&i.convert(I)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==It&&!H)}function x(I){if(I==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let M=t.precision!==void 0?t.precision:"highp";const T=x(M);T!==M&&(console.warn("THREE.WebGLRenderer:",M,"not supported, using",T,"instead."),M=T);const E=t.logarithmicDepthBuffer===!0,g=t.reverseDepthBuffer===!0&&n.has("EXT_clip_control"),_=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),N=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),P=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),r=e.getParameter(e.MAX_VERTEX_ATTRIBS),U=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),G=N>0,L=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:x,textureFormatReadable:u,textureTypeReadable:c,precision:M,logarithmicDepthBuffer:E,reverseDepthBuffer:g,maxTextures:_,maxVertexTextures:N,maxTextureSize:P,maxCubemapSize:f,maxAttributes:r,maxVertexUniforms:U,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:G,maxSamples:L}}function fc(e){const n=this;let t=null,i=0,s=!1,a=!1;const u=new Tr,c=new Fe,x={value:null,needsUpdate:!1};this.uniform=x,this.numPlanes=0,this.numIntersection=0,this.init=function(E,g){const _=E.length!==0||g||i!==0||s;return s=g,i=E.length,_},this.beginShadows=function(){a=!0,T(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(E,g){t=T(E,g,0)},this.setState=function(E,g,_){const N=E.clippingPlanes,P=E.clipIntersection,f=E.clipShadows,r=e.get(E);if(!s||N===null||N.length===0||a&&!f)a?T(null):M();else{const U=a?0:i,b=U*4;let v=r.clippingState||null;x.value=v,v=T(N,g,b,_);for(let G=0;G!==b;++G)v[G]=t[G];r.clippingState=v,this.numIntersection=P?this.numPlanes:0,this.numPlanes+=U}};function M(){x.value!==t&&(x.value=t,x.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function T(E,g,_,N){const P=E!==null?E.length:0;let f=null;if(P!==0){if(f=x.value,N!==!0||f===null){const r=_+P*4,U=g.matrixWorldInverse;c.getNormalMatrix(U),(f===null||f.length<r)&&(f=new Float32Array(r));for(let b=0,v=_;b!==P;++b,v+=4)u.copy(E[b]).applyMatrix4(U,c),u.normal.toArray(f,v),f[v+3]=u.constant}x.value=f,x.needsUpdate=!0}return n.numPlanes=P,n.numIntersection=0,f}}function dc(e){let n=new WeakMap;function t(u,c){return c===qn?u.mapping=rn:c===Zn&&(u.mapping=qt),u}function i(u){if(u&&u.isTexture){const c=u.mapping;if(c===qn||c===Zn)if(n.has(u)){const x=n.get(u).texture;return t(x,u.mapping)}else{const x=u.image;if(x&&x.height>0){const M=new Ka(x.height);return M.fromEquirectangularTexture(e,u),n.set(u,M),u.addEventListener("dispose",s),t(M.texture,u.mapping)}else return null}}return u}function s(u){const c=u.target;c.removeEventListener("dispose",s);const x=n.get(c);x!==void 0&&(n.delete(c),x.dispose())}function a(){n=new WeakMap}return{get:i,dispose:a}}const Wt=4,Xi=[.125,.215,.35,.446,.526,.582],yt=20,In=new ta,Yi=new Qe;let Nn=null,On=0,Fn=0,Bn=!1;const wt=(1+Math.sqrt(5))/2,Ht=1/wt,Ki=[new ye(-wt,Ht,0),new ye(wt,Ht,0),new ye(-Ht,0,wt),new ye(Ht,0,wt),new ye(0,wt,-Ht),new ye(0,wt,Ht),new ye(-1,1,-1),new ye(1,1,-1),new ye(-1,1,1),new ye(1,1,1)],uc=new ye;class qi{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,s=100,a={}){const{size:u=256,position:c=uc}=a;Nn=this._renderer.getRenderTarget(),On=this._renderer.getActiveCubeFace(),Fn=this._renderer.getActiveMipmapLevel(),Bn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const x=this._allocateTargets();return x.depthBuffer=!0,this._sceneToCubeUV(n,i,s,x,c),t>0&&this._blur(x,0,0,t),this._applyPMREM(x),this._cleanup(x),x}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ji(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$i(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(Nn,On,Fn),this._renderer.xr.enabled=Bn,n.scissorTest=!1,dn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===rn||n.mapping===qt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Nn=this._renderer.getRenderTarget(),On=this._renderer.getActiveCubeFace(),Fn=this._renderer.getActiveMipmapLevel(),Bn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Mn,format:bt,colorSpace:Tn,depthBuffer:!1},s=Zi(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zi(n,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=pc(a)),this._blurMaterial=hc(a,n,t)}return s}_compileMaterial(n){const t=new dt(this._lodPlanes[0],n);this._renderer.compile(t,In)}_sceneToCubeUV(n,t,i,s,a){const x=new mn(90,1,t,i),M=[1,-1,1,1,1,1],T=[1,1,1,-1,-1,-1],E=this._renderer,g=E.autoClear,_=E.toneMapping;E.getClearColor(Yi),E.toneMapping=Ct,E.autoClear=!1;const N=new Er({name:"PMREM.Background",side:vt,depthWrite:!1,depthTest:!1}),P=new dt(new jn,N);let f=!1;const r=n.background;r?r.isColor&&(N.color.copy(r),n.background=null,f=!0):(N.color.copy(Yi),f=!0);for(let U=0;U<6;U++){const b=U%3;b===0?(x.up.set(0,M[U],0),x.position.set(a.x,a.y,a.z),x.lookAt(a.x+T[U],a.y,a.z)):b===1?(x.up.set(0,0,M[U]),x.position.set(a.x,a.y,a.z),x.lookAt(a.x,a.y+T[U],a.z)):(x.up.set(0,M[U],0),x.position.set(a.x,a.y,a.z),x.lookAt(a.x,a.y,a.z+T[U]));const v=this._cubeSize;dn(s,b*v,U>2?v:0,v,v),E.setRenderTarget(s),f&&E.render(P,x),E.render(n,x)}P.geometry.dispose(),P.material.dispose(),E.toneMapping=_,E.autoClear=g,n.background=r}_textureToCubeUV(n,t){const i=this._renderer,s=n.mapping===rn||n.mapping===qt;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ji()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$i());const a=s?this._cubemapMaterial:this._equirectMaterial,u=new dt(this._lodPlanes[0],a),c=a.uniforms;c.envMap.value=n;const x=this._cubeSize;dn(t,0,0,3*x,2*x),i.setRenderTarget(t),i.render(u,In)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const u=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),c=Ki[(s-a-1)%Ki.length];this._blur(n,a-1,a,u,c)}t.autoClear=i}_blur(n,t,i,s,a){const u=this._pingPongRenderTarget;this._halfBlur(n,u,t,i,s,"latitudinal",a),this._halfBlur(u,n,i,i,s,"longitudinal",a)}_halfBlur(n,t,i,s,a,u,c){const x=this._renderer,M=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const T=3,E=new dt(this._lodPlanes[s],M),g=M.uniforms,_=this._sizeLods[i]-1,N=isFinite(a)?Math.PI/(2*_):2*Math.PI/(2*yt-1),P=a/N,f=isFinite(a)?1+Math.floor(T*P):yt;f>yt&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${yt}`);const r=[];let U=0;for(let I=0;I<yt;++I){const H=I/P,h=Math.exp(-H*H/2);r.push(h),I===0?U+=h:I<f&&(U+=2*h)}for(let I=0;I<r.length;I++)r[I]=r[I]/U;g.envMap.value=n.texture,g.samples.value=f,g.weights.value=r,g.latitudinal.value=u==="latitudinal",c&&(g.poleAxis.value=c);const{_lodMax:b}=this;g.dTheta.value=N,g.mipInt.value=b-i;const v=this._sizeLods[s],G=3*v*(s>b-Wt?s-b+Wt:0),L=4*(this._cubeSize-v);dn(t,G,L,3*v,2*v),x.setRenderTarget(t),x.render(E,In)}}function pc(e){const n=[],t=[],i=[];let s=e;const a=e-Wt+1+Xi.length;for(let u=0;u<a;u++){const c=Math.pow(2,s);t.push(c);let x=1/c;u>e-Wt?x=Xi[u-e+Wt-1]:u===0&&(x=0),i.push(x);const M=1/(c-2),T=-M,E=1+M,g=[T,T,E,T,E,E,T,T,E,E,T,E],_=6,N=6,P=3,f=2,r=1,U=new Float32Array(P*N*_),b=new Float32Array(f*N*_),v=new Float32Array(r*N*_);for(let L=0;L<_;L++){const I=L%3*2/3-1,H=L>2?0:-1,h=[I,H,0,I+2/3,H,0,I+2/3,H+1,0,I,H,0,I+2/3,H+1,0,I,H+1,0];U.set(h,P*N*L),b.set(g,f*N*L);const d=[L,L,L,L,L,L];v.set(d,r*N*L)}const G=new Jn;G.setAttribute("position",new en(U,P)),G.setAttribute("uv",new en(b,f)),G.setAttribute("faceIndex",new en(v,r)),n.push(G),s>Wt&&s--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function Zi(e,n,t){const i=new Kt(e,n,t);return i.texture.mapping=xn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function dn(e,n,t,i,s){e.viewport.set(n,t,i,s),e.scissor.set(n,t,i,s)}function hc(e,n,t){const i=new Float32Array(yt),s=new ye(0,1,0);return new Ft({name:"SphericalGaussianBlur",defines:{n:yt,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ei(),fragmentShader:`

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
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function $i(){return new Ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ei(),fragmentShader:`

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
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function ji(){return new Ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ei(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function ei(){return`

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
	`}function mc(e){let n=new WeakMap,t=null;function i(c){if(c&&c.isTexture){const x=c.mapping,M=x===qn||x===Zn,T=x===rn||x===qt;if(M||T){let E=n.get(c);const g=E!==void 0?E.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==g)return t===null&&(t=new qi(e)),E=M?t.fromEquirectangular(c,E):t.fromCubemap(c,E),E.texture.pmremVersion=c.pmremVersion,n.set(c,E),E.texture;if(E!==void 0)return E.texture;{const _=c.image;return M&&_&&_.height>0||T&&_&&s(_)?(t===null&&(t=new qi(e)),E=M?t.fromEquirectangular(c):t.fromCubemap(c),E.texture.pmremVersion=c.pmremVersion,n.set(c,E),c.addEventListener("dispose",a),E.texture):null}}}return c}function s(c){let x=0;const M=6;for(let T=0;T<M;T++)c[T]!==void 0&&x++;return x===M}function a(c){const x=c.target;x.removeEventListener("dispose",a);const M=n.get(x);M!==void 0&&(n.delete(x),M.dispose())}function u(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:u}}function _c(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return n[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&hn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function gc(e,n,t,i){const s={},a=new WeakMap;function u(E){const g=E.target;g.index!==null&&n.remove(g.index);for(const N in g.attributes)n.remove(g.attributes[N]);g.removeEventListener("dispose",u),delete s[g.id];const _=a.get(g);_&&(n.remove(_),a.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(E,g){return s[g.id]===!0||(g.addEventListener("dispose",u),s[g.id]=!0,t.memory.geometries++),g}function x(E){const g=E.attributes;for(const _ in g)n.update(g[_],e.ARRAY_BUFFER)}function M(E){const g=[],_=E.index,N=E.attributes.position;let P=0;if(_!==null){const U=_.array;P=_.version;for(let b=0,v=U.length;b<v;b+=3){const G=U[b+0],L=U[b+1],I=U[b+2];g.push(G,L,L,I,I,G)}}else if(N!==void 0){const U=N.array;P=N.version;for(let b=0,v=U.length/3-1;b<v;b+=3){const G=b+0,L=b+1,I=b+2;g.push(G,L,L,I,I,G)}}else return;const f=new(Ja(g)?ja:Qa)(g,1);f.version=P;const r=a.get(E);r&&n.remove(r),a.set(E,f)}function T(E){const g=a.get(E);if(g){const _=E.index;_!==null&&g.version<_.version&&M(E)}else M(E);return a.get(E)}return{get:c,update:x,getWireframeAttribute:T}}function vc(e,n,t){let i;function s(g){i=g}let a,u;function c(g){a=g.type,u=g.bytesPerElement}function x(g,_){e.drawElements(i,_,a,g*u),t.update(_,i,1)}function M(g,_,N){N!==0&&(e.drawElementsInstanced(i,_,a,g*u,N),t.update(_,i,N))}function T(g,_,N){if(N===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,_,0,a,g,0,N);let f=0;for(let r=0;r<N;r++)f+=_[r];t.update(f,i,1)}function E(g,_,N,P){if(N===0)return;const f=n.get("WEBGL_multi_draw");if(f===null)for(let r=0;r<g.length;r++)M(g[r]/u,_[r],P[r]);else{f.multiDrawElementsInstancedWEBGL(i,_,0,a,g,0,P,0,N);let r=0;for(let U=0;U<N;U++)r+=_[U]*P[U];t.update(r,i,1)}}this.setMode=s,this.setIndex=c,this.render=x,this.renderInstances=M,this.renderMultiDraw=T,this.renderMultiDrawInstances=E}function Ec(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,u,c){switch(t.calls++,u){case e.TRIANGLES:t.triangles+=c*(a/3);break;case e.LINES:t.lines+=c*(a/2);break;case e.LINE_STRIP:t.lines+=c*(a-1);break;case e.LINE_LOOP:t.lines+=c*a;break;case e.POINTS:t.points+=c*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Sc(e,n,t){const i=new WeakMap,s=new mt;function a(u,c,x){const M=u.morphTargetInfluences,T=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,E=T!==void 0?T.length:0;let g=i.get(c);if(g===void 0||g.count!==E){let h=function(){I.dispose(),i.delete(c),c.removeEventListener("dispose",h)};g!==void 0&&g.texture.dispose();const _=c.morphAttributes.position!==void 0,N=c.morphAttributes.normal!==void 0,P=c.morphAttributes.color!==void 0,f=c.morphAttributes.position||[],r=c.morphAttributes.normal||[],U=c.morphAttributes.color||[];let b=0;_===!0&&(b=1),N===!0&&(b=2),P===!0&&(b=3);let v=c.attributes.position.count*b,G=1;v>n.maxTextureSize&&(G=Math.ceil(v/n.maxTextureSize),v=n.maxTextureSize);const L=new Float32Array(v*G*4*E),I=new wr(L,v,G,E);I.type=It,I.needsUpdate=!0;const H=b*4;for(let d=0;d<E;d++){const C=f[d],K=r[d],V=U[d],Y=v*G*4*d;for(let Q=0;Q<C.count;Q++){const W=Q*H;_===!0&&(s.fromBufferAttribute(C,Q),L[Y+W+0]=s.x,L[Y+W+1]=s.y,L[Y+W+2]=s.z,L[Y+W+3]=0),N===!0&&(s.fromBufferAttribute(K,Q),L[Y+W+4]=s.x,L[Y+W+5]=s.y,L[Y+W+6]=s.z,L[Y+W+7]=0),P===!0&&(s.fromBufferAttribute(V,Q),L[Y+W+8]=s.x,L[Y+W+9]=s.y,L[Y+W+10]=s.z,L[Y+W+11]=V.itemSize===4?s.w:1)}}g={count:E,texture:I,size:new $e(v,G)},i.set(c,g),c.addEventListener("dispose",h)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)x.getUniforms().setValue(e,"morphTexture",u.morphTexture,t);else{let _=0;for(let P=0;P<M.length;P++)_+=M[P];const N=c.morphTargetsRelative?1:1-_;x.getUniforms().setValue(e,"morphTargetBaseInfluence",N),x.getUniforms().setValue(e,"morphTargetInfluences",M)}x.getUniforms().setValue(e,"morphTargetsTexture",g.texture,t),x.getUniforms().setValue(e,"morphTargetsTextureSize",g.size)}return{update:a}}function Mc(e,n,t,i){let s=new WeakMap;function a(x){const M=i.render.frame,T=x.geometry,E=n.get(x,T);if(s.get(E)!==M&&(n.update(E),s.set(E,M)),x.isInstancedMesh&&(x.hasEventListener("dispose",c)===!1&&x.addEventListener("dispose",c),s.get(x)!==M&&(t.update(x.instanceMatrix,e.ARRAY_BUFFER),x.instanceColor!==null&&t.update(x.instanceColor,e.ARRAY_BUFFER),s.set(x,M))),x.isSkinnedMesh){const g=x.skeleton;s.get(g)!==M&&(g.update(),s.set(g,M))}return E}function u(){s=new WeakMap}function c(x){const M=x.target;M.removeEventListener("dispose",c),t.remove(M.instanceMatrix),M.instanceColor!==null&&t.remove(M.instanceColor)}return{update:a,dispose:u}}const Fr=new br,Qi=new Sr(1,1),Br=new wr,Hr=new fo,Gr=new co,Ji=[],er=[],tr=new Float32Array(16),nr=new Float32Array(9),ir=new Float32Array(4);function Zt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const s=n*t;let a=Ji[s];if(a===void 0&&(a=new Float32Array(s),Ji[s]=a),n!==0){i.toArray(a,0);for(let u=1,c=0;u!==n;++u)c+=t,e[u].toArray(a,c)}return a}function st(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function lt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function An(e,n){let t=er[n];t===void 0&&(t=new Int32Array(n),er[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Tc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function xc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2fv(this.addr,n),lt(t,n)}}function Ac(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(st(t,n))return;e.uniform3fv(this.addr,n),lt(t,n)}}function Rc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4fv(this.addr,n),lt(t,n)}}function bc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;ir.set(i),e.uniformMatrix2fv(this.addr,!1,ir),lt(t,i)}}function Cc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;nr.set(i),e.uniformMatrix3fv(this.addr,!1,nr),lt(t,i)}}function Pc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(st(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),lt(t,n)}else{if(st(t,i))return;tr.set(i),e.uniformMatrix4fv(this.addr,!1,tr),lt(t,i)}}function Dc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Lc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2iv(this.addr,n),lt(t,n)}}function Uc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3iv(this.addr,n),lt(t,n)}}function wc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4iv(this.addr,n),lt(t,n)}}function yc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Ic(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(st(t,n))return;e.uniform2uiv(this.addr,n),lt(t,n)}}function Nc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(st(t,n))return;e.uniform3uiv(this.addr,n),lt(t,n)}}function Oc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(st(t,n))return;e.uniform4uiv(this.addr,n),lt(t,n)}}function Fc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(Qi.compareFunction=Mr,a=Qi):a=Fr,t.setTexture2D(n||a,s)}function Bc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(n||Hr,s)}function Hc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(n||Gr,s)}function Gc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(n||Br,s)}function Vc(e){switch(e){case 5126:return Tc;case 35664:return xc;case 35665:return Ac;case 35666:return Rc;case 35674:return bc;case 35675:return Cc;case 35676:return Pc;case 5124:case 35670:return Dc;case 35667:case 35671:return Lc;case 35668:case 35672:return Uc;case 35669:case 35673:return wc;case 5125:return yc;case 36294:return Ic;case 36295:return Nc;case 36296:return Oc;case 35678:case 36198:case 36298:case 36306:case 35682:return Fc;case 35679:case 36299:case 36307:return Bc;case 35680:case 36300:case 36308:case 36293:return Hc;case 36289:case 36303:case 36311:case 36292:return Gc}}function kc(e,n){e.uniform1fv(this.addr,n)}function zc(e,n){const t=Zt(n,this.size,2);e.uniform2fv(this.addr,t)}function Wc(e,n){const t=Zt(n,this.size,3);e.uniform3fv(this.addr,t)}function Xc(e,n){const t=Zt(n,this.size,4);e.uniform4fv(this.addr,t)}function Yc(e,n){const t=Zt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Kc(e,n){const t=Zt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function qc(e,n){const t=Zt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Zc(e,n){e.uniform1iv(this.addr,n)}function $c(e,n){e.uniform2iv(this.addr,n)}function jc(e,n){e.uniform3iv(this.addr,n)}function Qc(e,n){e.uniform4iv(this.addr,n)}function Jc(e,n){e.uniform1uiv(this.addr,n)}function ef(e,n){e.uniform2uiv(this.addr,n)}function tf(e,n){e.uniform3uiv(this.addr,n)}function nf(e,n){e.uniform4uiv(this.addr,n)}function rf(e,n,t){const i=this.cache,s=n.length,a=An(t,s);st(i,a)||(e.uniform1iv(this.addr,a),lt(i,a));for(let u=0;u!==s;++u)t.setTexture2D(n[u]||Fr,a[u])}function af(e,n,t){const i=this.cache,s=n.length,a=An(t,s);st(i,a)||(e.uniform1iv(this.addr,a),lt(i,a));for(let u=0;u!==s;++u)t.setTexture3D(n[u]||Hr,a[u])}function of(e,n,t){const i=this.cache,s=n.length,a=An(t,s);st(i,a)||(e.uniform1iv(this.addr,a),lt(i,a));for(let u=0;u!==s;++u)t.setTextureCube(n[u]||Gr,a[u])}function sf(e,n,t){const i=this.cache,s=n.length,a=An(t,s);st(i,a)||(e.uniform1iv(this.addr,a),lt(i,a));for(let u=0;u!==s;++u)t.setTexture2DArray(n[u]||Br,a[u])}function lf(e){switch(e){case 5126:return kc;case 35664:return zc;case 35665:return Wc;case 35666:return Xc;case 35674:return Yc;case 35675:return Kc;case 35676:return qc;case 5124:case 35670:return Zc;case 35667:case 35671:return $c;case 35668:case 35672:return jc;case 35669:case 35673:return Qc;case 5125:return Jc;case 36294:return ef;case 36295:return tf;case 36296:return nf;case 35678:case 36198:case 36298:case 36306:case 35682:return rf;case 35679:case 36299:case 36307:return af;case 35680:case 36300:case 36308:case 36293:return of;case 36289:case 36303:case 36311:case 36292:return sf}}class cf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Vc(t.type)}}class ff{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lf(t.type)}}class df{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const s=this.seq;for(let a=0,u=s.length;a!==u;++a){const c=s[a];c.setValue(n,t[c.id],i)}}}const Hn=/(\w+)(\])?(\[|\.)?/g;function rr(e,n){e.seq.push(n),e.map[n.id]=n}function uf(e,n,t){const i=e.name,s=i.length;for(Hn.lastIndex=0;;){const a=Hn.exec(i),u=Hn.lastIndex;let c=a[1];const x=a[2]==="]",M=a[3];if(x&&(c=c|0),M===void 0||M==="["&&u+2===s){rr(t,M===void 0?new cf(c,e,n):new ff(c,e,n));break}else{let E=t.map[c];E===void 0&&(E=new df(c),rr(t,E)),t=E}}}class gn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=n.getActiveUniform(t,s),u=n.getUniformLocation(t,a.name);uf(a,u,this)}}setValue(n,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(n,i,s)}setOptional(n,t,i){const s=t[i];s!==void 0&&this.setValue(n,i,s)}static upload(n,t,i,s){for(let a=0,u=t.length;a!==u;++a){const c=t[a],x=i[c.id];x.needsUpdate!==!1&&c.setValue(n,x.value,s)}}static seqWithValue(n,t){const i=[];for(let s=0,a=n.length;s!==a;++s){const u=n[s];u.id in t&&i.push(u)}return i}}function ar(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const pf=37297;let hf=0;function mf(e,n){const t=e.split(`
`),i=[],s=Math.max(n-6,0),a=Math.min(n+6,t.length);for(let u=s;u<a;u++){const c=u+1;i.push(`${c===n?">":" "} ${c}: ${t[u]}`)}return i.join(`
`)}const or=new Fe;function _f(e){rt._getMatrix(or,rt.workingColorSpace,e);const n=`mat3( ${or.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(e)){case Nr:return[n,"LinearTransferOETF"];case Ze:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function sr(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),s=e.getShaderInfoLog(n).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const u=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+mf(e.getShaderSource(n),u)}else return s}function gf(e,n){const t=_f(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function vf(e,n){let t;switch(n){case lo:t="Linear";break;case so:t="Reinhard";break;case oo:t="Cineon";break;case ao:t="ACESFilmic";break;case ro:t="AgX";break;case io:t="Neutral";break;case no:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const un=new ye;function Ef(){rt.getLuminanceCoefficients(un);const e=un.x.toFixed(4),n=un.y.toFixed(4),t=un.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sf(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jt).join(`
`)}function Mf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Tf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=e.getActiveAttrib(n,s),u=a.name;let c=1;a.type===e.FLOAT_MAT2&&(c=2),a.type===e.FLOAT_MAT3&&(c=3),a.type===e.FLOAT_MAT4&&(c=4),t[u]={type:a.type,location:e.getAttribLocation(n,u),locationSize:c}}return t}function Jt(e){return e!==""}function lr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function cr(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const xf=/^[ \t]*#include +<([\w\d./]+)>/gm;function $n(e){return e.replace(xf,Rf)}const Af=new Map;function Rf(e,n){let t=Ue[n];if(t===void 0){const i=Af.get(n);if(i!==void 0)t=Ue[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return $n(t)}const bf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fr(e){return e.replace(bf,Cf)}function Cf(e,n,t,i){let s="";for(let a=parseInt(n);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function dr(e){let n=`precision ${e.precision} float;
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
#define LOW_PRECISION`),n}function Pf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===xr?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===to?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===At&&(n="SHADOWMAP_TYPE_VSM"),n}function Df(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case rn:case qt:n="ENVMAP_TYPE_CUBE";break;case xn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function Lf(e){let n="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case qt:n="ENVMAP_MODE_REFRACTION";break}return n}function Uf(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case mo:n="ENVMAP_BLENDING_MULTIPLY";break;case ho:n="ENVMAP_BLENDING_MIX";break;case po:n="ENVMAP_BLENDING_ADD";break}return n}function wf(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function yf(e,n,t,i){const s=e.getContext(),a=t.defines;let u=t.vertexShader,c=t.fragmentShader;const x=Pf(t),M=Df(t),T=Lf(t),E=Uf(t),g=wf(t),_=Sf(t),N=Mf(a),P=s.createProgram();let f,r,U=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(Jt).join(`
`),f.length>0&&(f+=`
`),r=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(Jt).join(`
`),r.length>0&&(r+=`
`)):(f=[dr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+T:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+x:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jt).join(`
`),r=[dr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+M:"",t.envMap?"#define "+T:"",t.envMap?"#define "+E:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+x:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ct?"#define TONE_MAPPING":"",t.toneMapping!==Ct?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Ct?vf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,gf("linearToOutputTexel",t.outputColorSpace),Ef(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Jt).join(`
`)),u=$n(u),u=lr(u,t),u=cr(u,t),c=$n(c),c=lr(c,t),c=cr(c,t),u=fr(u),c=fr(c),t.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,f=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,r=["#define varying in",t.glslVersion===Vi?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+r);const b=U+f+u,v=U+r+c,G=ar(s,s.VERTEX_SHADER,b),L=ar(s,s.FRAGMENT_SHADER,v);s.attachShader(P,G),s.attachShader(P,L),t.index0AttributeName!==void 0?s.bindAttribLocation(P,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(P,0,"position"),s.linkProgram(P);function I(C){if(e.debug.checkShaderErrors){const K=s.getProgramInfoLog(P).trim(),V=s.getShaderInfoLog(G).trim(),Y=s.getShaderInfoLog(L).trim();let Q=!0,W=!0;if(s.getProgramParameter(P,s.LINK_STATUS)===!1)if(Q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,P,G,L);else{const ee=sr(s,G,"vertex"),F=sr(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(P,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+K+`
`+ee+`
`+F)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(V===""||Y==="")&&(W=!1);W&&(C.diagnostics={runnable:Q,programLog:K,vertexShader:{log:V,prefix:f},fragmentShader:{log:Y,prefix:r}})}s.deleteShader(G),s.deleteShader(L),H=new gn(s,P),h=Tf(s,P)}let H;this.getUniforms=function(){return H===void 0&&I(this),H};let h;this.getAttributes=function(){return h===void 0&&I(this),h};let d=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return d===!1&&(d=s.getProgramParameter(P,pf)),d},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(P),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hf++,this.cacheKey=n,this.usedTimes=1,this.program=P,this.vertexShader=G,this.fragmentShader=L,this}let If=0;class Nf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),u=this._getShaderCacheForMaterial(n);return u.has(s)===!1&&(u.add(s),s.usedTimes++),u.has(a)===!1&&(u.add(a),a.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Of(n),t.set(n,i)),i}}class Of{constructor(n){this.id=If++,this.code=n,this.usedTimes=0}}function Ff(e,n,t,i,s,a,u){const c=new eo,x=new Nf,M=new Set,T=[],E=s.logarithmicDepthBuffer,g=s.vertexTextures;let _=s.precision;const N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function P(h){return M.add(h),h===0?"uv":`uv${h}`}function f(h,d,C,K,V){const Y=K.fog,Q=V.geometry,W=h.isMeshStandardMaterial?K.environment:null,ee=(h.isMeshStandardMaterial?t:n).get(h.envMap||W),F=ee&&ee.mapping===xn?ee.image.height:null,ve=N[h.type];h.precision!==null&&(_=s.getMaxPrecision(h.precision),_!==h.precision&&console.warn("THREE.WebGLProgram.getParameters:",h.precision,"not supported, using",_,"instead."));const Ae=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,we=Ae!==void 0?Ae.length:0;let Ve=0;Q.morphAttributes.position!==void 0&&(Ve=1),Q.morphAttributes.normal!==void 0&&(Ve=2),Q.morphAttributes.color!==void 0&&(Ve=3);let nt,k,J,_e;if(ve){const ke=Tt[ve];nt=ke.vertexShader,k=ke.fragmentShader}else nt=h.vertexShader,k=h.fragmentShader,x.update(h),J=x.getVertexShaderID(h),_e=x.getFragmentShaderID(h);const oe=e.getRenderTarget(),ge=e.state.buffers.depth.getReversed(),Be=V.isInstancedMesh===!0,Re=V.isBatchedMesh===!0,Je=!!h.map,et=!!h.matcap,He=!!ee,m=!!h.aoMap,ct=!!h.lightMap,Ge=!!h.bumpMap,Ye=!!h.normalMap,pe=!!h.displacementMap,Ne=!!h.emissiveMap,Se=!!h.metalnessMap,Le=!!h.roughnessMap,at=h.anisotropy>0,p=h.clearcoat>0,o=h.dispersion>0,D=h.iridescence>0,B=h.sheen>0,X=h.transmission>0,O=at&&!!h.anisotropyMap,he=p&&!!h.clearcoatMap,ie=p&&!!h.clearcoatNormalMap,ue=p&&!!h.clearcoatRoughnessMap,me=D&&!!h.iridescenceMap,q=D&&!!h.iridescenceThicknessMap,se=B&&!!h.sheenColorMap,xe=B&&!!h.sheenRoughnessMap,Te=!!h.specularMap,te=!!h.specularColorMap,Pe=!!h.specularIntensityMap,S=X&&!!h.transmissionMap,re=X&&!!h.thicknessMap,Z=!!h.gradientMap,ce=!!h.alphaMap,$=h.alphaTest>0,z=!!h.alphaHash,fe=!!h.extensions;let De=Ct;h.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(De=e.toneMapping);const Ke={shaderID:ve,shaderType:h.type,shaderName:h.name,vertexShader:nt,fragmentShader:k,defines:h.defines,customVertexShaderID:J,customFragmentShaderID:_e,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:_,batching:Re,batchingColor:Re&&V._colorsTexture!==null,instancing:Be,instancingColor:Be&&V.instanceColor!==null,instancingMorph:Be&&V.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:oe===null?e.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Tn,alphaToCoverage:!!h.alphaToCoverage,map:Je,matcap:et,envMap:He,envMapMode:He&&ee.mapping,envMapCubeUVHeight:F,aoMap:m,lightMap:ct,bumpMap:Ge,normalMap:Ye,displacementMap:g&&pe,emissiveMap:Ne,normalMapObjectSpace:Ye&&h.normalMapType===$a,normalMapTangentSpace:Ye&&h.normalMapType===Za,metalnessMap:Se,roughnessMap:Le,anisotropy:at,anisotropyMap:O,clearcoat:p,clearcoatMap:he,clearcoatNormalMap:ie,clearcoatRoughnessMap:ue,dispersion:o,iridescence:D,iridescenceMap:me,iridescenceThicknessMap:q,sheen:B,sheenColorMap:se,sheenRoughnessMap:xe,specularMap:Te,specularColorMap:te,specularIntensityMap:Pe,transmission:X,transmissionMap:S,thicknessMap:re,gradientMap:Z,opaque:h.transparent===!1&&h.blending===_n&&h.alphaToCoverage===!1,alphaMap:ce,alphaTest:$,alphaHash:z,combine:h.combine,mapUv:Je&&P(h.map.channel),aoMapUv:m&&P(h.aoMap.channel),lightMapUv:ct&&P(h.lightMap.channel),bumpMapUv:Ge&&P(h.bumpMap.channel),normalMapUv:Ye&&P(h.normalMap.channel),displacementMapUv:pe&&P(h.displacementMap.channel),emissiveMapUv:Ne&&P(h.emissiveMap.channel),metalnessMapUv:Se&&P(h.metalnessMap.channel),roughnessMapUv:Le&&P(h.roughnessMap.channel),anisotropyMapUv:O&&P(h.anisotropyMap.channel),clearcoatMapUv:he&&P(h.clearcoatMap.channel),clearcoatNormalMapUv:ie&&P(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&P(h.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&P(h.iridescenceMap.channel),iridescenceThicknessMapUv:q&&P(h.iridescenceThicknessMap.channel),sheenColorMapUv:se&&P(h.sheenColorMap.channel),sheenRoughnessMapUv:xe&&P(h.sheenRoughnessMap.channel),specularMapUv:Te&&P(h.specularMap.channel),specularColorMapUv:te&&P(h.specularColorMap.channel),specularIntensityMapUv:Pe&&P(h.specularIntensityMap.channel),transmissionMapUv:S&&P(h.transmissionMap.channel),thicknessMapUv:re&&P(h.thicknessMap.channel),alphaMapUv:ce&&P(h.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Ye||at),vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Q.attributes.uv&&(Je||ce),fog:!!Y,useFog:h.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:h.flatShading===!0&&h.wireframe===!1,sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:E,reverseDepthBuffer:ge,skinning:V.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Ve,numDirLights:d.directional.length,numPointLights:d.point.length,numSpotLights:d.spot.length,numSpotLightMaps:d.spotLightMap.length,numRectAreaLights:d.rectArea.length,numHemiLights:d.hemi.length,numDirLightShadows:d.directionalShadowMap.length,numPointLightShadows:d.pointShadowMap.length,numSpotLightShadows:d.spotShadowMap.length,numSpotLightShadowsWithMaps:d.numSpotLightShadowsWithMaps,numLightProbes:d.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:h.dithering,shadowMapEnabled:e.shadowMap.enabled&&C.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:Je&&h.map.isVideoTexture===!0&&rt.getTransfer(h.map.colorSpace)===Ze,decodeVideoTextureEmissive:Ne&&h.emissiveMap.isVideoTexture===!0&&rt.getTransfer(h.emissiveMap.colorSpace)===Ze,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===Rt,flipSided:h.side===vt,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:fe&&h.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&h.extensions.multiDraw===!0||Re)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return Ke.vertexUv1s=M.has(1),Ke.vertexUv2s=M.has(2),Ke.vertexUv3s=M.has(3),M.clear(),Ke}function r(h){const d=[];if(h.shaderID?d.push(h.shaderID):(d.push(h.customVertexShaderID),d.push(h.customFragmentShaderID)),h.defines!==void 0)for(const C in h.defines)d.push(C),d.push(h.defines[C]);return h.isRawShaderMaterial===!1&&(U(d,h),b(d,h),d.push(e.outputColorSpace)),d.push(h.customProgramCacheKey),d.join()}function U(h,d){h.push(d.precision),h.push(d.outputColorSpace),h.push(d.envMapMode),h.push(d.envMapCubeUVHeight),h.push(d.mapUv),h.push(d.alphaMapUv),h.push(d.lightMapUv),h.push(d.aoMapUv),h.push(d.bumpMapUv),h.push(d.normalMapUv),h.push(d.displacementMapUv),h.push(d.emissiveMapUv),h.push(d.metalnessMapUv),h.push(d.roughnessMapUv),h.push(d.anisotropyMapUv),h.push(d.clearcoatMapUv),h.push(d.clearcoatNormalMapUv),h.push(d.clearcoatRoughnessMapUv),h.push(d.iridescenceMapUv),h.push(d.iridescenceThicknessMapUv),h.push(d.sheenColorMapUv),h.push(d.sheenRoughnessMapUv),h.push(d.specularMapUv),h.push(d.specularColorMapUv),h.push(d.specularIntensityMapUv),h.push(d.transmissionMapUv),h.push(d.thicknessMapUv),h.push(d.combine),h.push(d.fogExp2),h.push(d.sizeAttenuation),h.push(d.morphTargetsCount),h.push(d.morphAttributeCount),h.push(d.numDirLights),h.push(d.numPointLights),h.push(d.numSpotLights),h.push(d.numSpotLightMaps),h.push(d.numHemiLights),h.push(d.numRectAreaLights),h.push(d.numDirLightShadows),h.push(d.numPointLightShadows),h.push(d.numSpotLightShadows),h.push(d.numSpotLightShadowsWithMaps),h.push(d.numLightProbes),h.push(d.shadowMapType),h.push(d.toneMapping),h.push(d.numClippingPlanes),h.push(d.numClipIntersection),h.push(d.depthPacking)}function b(h,d){c.disableAll(),d.supportsVertexTextures&&c.enable(0),d.instancing&&c.enable(1),d.instancingColor&&c.enable(2),d.instancingMorph&&c.enable(3),d.matcap&&c.enable(4),d.envMap&&c.enable(5),d.normalMapObjectSpace&&c.enable(6),d.normalMapTangentSpace&&c.enable(7),d.clearcoat&&c.enable(8),d.iridescence&&c.enable(9),d.alphaTest&&c.enable(10),d.vertexColors&&c.enable(11),d.vertexAlphas&&c.enable(12),d.vertexUv1s&&c.enable(13),d.vertexUv2s&&c.enable(14),d.vertexUv3s&&c.enable(15),d.vertexTangents&&c.enable(16),d.anisotropy&&c.enable(17),d.alphaHash&&c.enable(18),d.batching&&c.enable(19),d.dispersion&&c.enable(20),d.batchingColor&&c.enable(21),d.gradientMap&&c.enable(22),h.push(c.mask),c.disableAll(),d.fog&&c.enable(0),d.useFog&&c.enable(1),d.flatShading&&c.enable(2),d.logarithmicDepthBuffer&&c.enable(3),d.reverseDepthBuffer&&c.enable(4),d.skinning&&c.enable(5),d.morphTargets&&c.enable(6),d.morphNormals&&c.enable(7),d.morphColors&&c.enable(8),d.premultipliedAlpha&&c.enable(9),d.shadowMapEnabled&&c.enable(10),d.doubleSided&&c.enable(11),d.flipSided&&c.enable(12),d.useDepthPacking&&c.enable(13),d.dithering&&c.enable(14),d.transmission&&c.enable(15),d.sheen&&c.enable(16),d.opaque&&c.enable(17),d.pointsUvs&&c.enable(18),d.decodeVideoTexture&&c.enable(19),d.decodeVideoTextureEmissive&&c.enable(20),d.alphaToCoverage&&c.enable(21),h.push(c.mask)}function v(h){const d=N[h.type];let C;if(d){const K=Tt[d];C=qa.clone(K.uniforms)}else C=h.uniforms;return C}function G(h,d){let C;for(let K=0,V=T.length;K<V;K++){const Y=T[K];if(Y.cacheKey===d){C=Y,++C.usedTimes;break}}return C===void 0&&(C=new yf(e,d,h,a),T.push(C)),C}function L(h){if(--h.usedTimes===0){const d=T.indexOf(h);T[d]=T[T.length-1],T.pop(),h.destroy()}}function I(h){x.remove(h)}function H(){x.dispose()}return{getParameters:f,getProgramCacheKey:r,getUniforms:v,acquireProgram:G,releaseProgram:L,releaseShaderCache:I,programs:T,dispose:H}}function Bf(){let e=new WeakMap;function n(u){return e.has(u)}function t(u){let c=e.get(u);return c===void 0&&(c={},e.set(u,c)),c}function i(u){e.delete(u)}function s(u,c,x){e.get(u)[c]=x}function a(){e=new WeakMap}return{has:n,get:t,remove:i,update:s,dispose:a}}function Hf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function ur(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function pr(){const e=[];let n=0;const t=[],i=[],s=[];function a(){n=0,t.length=0,i.length=0,s.length=0}function u(E,g,_,N,P,f){let r=e[n];return r===void 0?(r={id:E.id,object:E,geometry:g,material:_,groupOrder:N,renderOrder:E.renderOrder,z:P,group:f},e[n]=r):(r.id=E.id,r.object=E,r.geometry=g,r.material=_,r.groupOrder=N,r.renderOrder=E.renderOrder,r.z=P,r.group=f),n++,r}function c(E,g,_,N,P,f){const r=u(E,g,_,N,P,f);_.transmission>0?i.push(r):_.transparent===!0?s.push(r):t.push(r)}function x(E,g,_,N,P,f){const r=u(E,g,_,N,P,f);_.transmission>0?i.unshift(r):_.transparent===!0?s.unshift(r):t.unshift(r)}function M(E,g){t.length>1&&t.sort(E||Hf),i.length>1&&i.sort(g||ur),s.length>1&&s.sort(g||ur)}function T(){for(let E=n,g=e.length;E<g;E++){const _=e[E];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:c,unshift:x,finish:T,sort:M}}function Gf(){let e=new WeakMap;function n(i,s){const a=e.get(i);let u;return a===void 0?(u=new pr,e.set(i,[u])):s>=a.length?(u=new pr,a.push(u)):u=a[s],u}function t(){e=new WeakMap}return{get:n,dispose:t}}function Vf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new ye,color:new Qe};break;case"SpotLight":t={position:new ye,direction:new ye,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ye,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ye,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new ye,halfWidth:new ye,halfHeight:new ye};break}return e[n.id]=t,t}}}function kf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let zf=0;function Wf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Xf(e){const n=new Vf,t=kf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let M=0;M<9;M++)i.probe.push(new ye);const s=new ye,a=new Yt,u=new Yt;function c(M){let T=0,E=0,g=0;for(let h=0;h<9;h++)i.probe[h].set(0,0,0);let _=0,N=0,P=0,f=0,r=0,U=0,b=0,v=0,G=0,L=0,I=0;M.sort(Wf);for(let h=0,d=M.length;h<d;h++){const C=M[h],K=C.color,V=C.intensity,Y=C.distance,Q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)T+=K.r*V,E+=K.g*V,g+=K.b*V;else if(C.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(C.sh.coefficients[W],V);I++}else if(C.isDirectionalLight){const W=n.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const ee=C.shadow,F=t.get(C);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,i.directionalShadow[_]=F,i.directionalShadowMap[_]=Q,i.directionalShadowMatrix[_]=C.shadow.matrix,U++}i.directional[_]=W,_++}else if(C.isSpotLight){const W=n.get(C);W.position.setFromMatrixPosition(C.matrixWorld),W.color.copy(K).multiplyScalar(V),W.distance=Y,W.coneCos=Math.cos(C.angle),W.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),W.decay=C.decay,i.spot[P]=W;const ee=C.shadow;if(C.map&&(i.spotLightMap[G]=C.map,G++,ee.updateMatrices(C),C.castShadow&&L++),i.spotLightMatrix[P]=ee.matrix,C.castShadow){const F=t.get(C);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,i.spotShadow[P]=F,i.spotShadowMap[P]=Q,v++}P++}else if(C.isRectAreaLight){const W=n.get(C);W.color.copy(K).multiplyScalar(V),W.halfWidth.set(C.width*.5,0,0),W.halfHeight.set(0,C.height*.5,0),i.rectArea[f]=W,f++}else if(C.isPointLight){const W=n.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),W.distance=C.distance,W.decay=C.decay,C.castShadow){const ee=C.shadow,F=t.get(C);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,F.shadowCameraNear=ee.camera.near,F.shadowCameraFar=ee.camera.far,i.pointShadow[N]=F,i.pointShadowMap[N]=Q,i.pointShadowMatrix[N]=C.shadow.matrix,b++}i.point[N]=W,N++}else if(C.isHemisphereLight){const W=n.get(C);W.skyColor.copy(C.color).multiplyScalar(V),W.groundColor.copy(C.groundColor).multiplyScalar(V),i.hemi[r]=W,r++}}f>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ne.LTC_FLOAT_1,i.rectAreaLTC2=ne.LTC_FLOAT_2):(i.rectAreaLTC1=ne.LTC_HALF_1,i.rectAreaLTC2=ne.LTC_HALF_2)),i.ambient[0]=T,i.ambient[1]=E,i.ambient[2]=g;const H=i.hash;(H.directionalLength!==_||H.pointLength!==N||H.spotLength!==P||H.rectAreaLength!==f||H.hemiLength!==r||H.numDirectionalShadows!==U||H.numPointShadows!==b||H.numSpotShadows!==v||H.numSpotMaps!==G||H.numLightProbes!==I)&&(i.directional.length=_,i.spot.length=P,i.rectArea.length=f,i.point.length=N,i.hemi.length=r,i.directionalShadow.length=U,i.directionalShadowMap.length=U,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=U,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=v+G-L,i.spotLightMap.length=G,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=I,H.directionalLength=_,H.pointLength=N,H.spotLength=P,H.rectAreaLength=f,H.hemiLength=r,H.numDirectionalShadows=U,H.numPointShadows=b,H.numSpotShadows=v,H.numSpotMaps=G,H.numLightProbes=I,i.version=zf++)}function x(M,T){let E=0,g=0,_=0,N=0,P=0;const f=T.matrixWorldInverse;for(let r=0,U=M.length;r<U;r++){const b=M[r];if(b.isDirectionalLight){const v=i.directional[E];v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(f),E++}else if(b.isSpotLight){const v=i.spot[_];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(f),v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(f),_++}else if(b.isRectAreaLight){const v=i.rectArea[N];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(f),u.identity(),a.copy(b.matrixWorld),a.premultiply(f),u.extractRotation(a),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(u),v.halfHeight.applyMatrix4(u),N++}else if(b.isPointLight){const v=i.point[g];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(f),g++}else if(b.isHemisphereLight){const v=i.hemi[P];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(f),P++}}}return{setup:c,setupView:x,state:i}}function hr(e){const n=new Xf(e),t=[],i=[];function s(T){M.camera=T,t.length=0,i.length=0}function a(T){t.push(T)}function u(T){i.push(T)}function c(){n.setup(t)}function x(T){n.setupView(t,T)}const M={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:s,state:M,setupLights:c,setupLightsView:x,pushLight:a,pushShadow:u}}function Yf(e){let n=new WeakMap;function t(s,a=0){const u=n.get(s);let c;return u===void 0?(c=new hr(e),n.set(s,[c])):a>=u.length?(c=new hr(e),u.push(c)):c=u[a],c}function i(){n=new WeakMap}return{get:t,dispose:i}}const Kf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qf=`uniform sampler2D shadow_pass;
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
}`;function Zf(e,n,t){let i=new vr;const s=new $e,a=new $e,u=new mt,c=new ya({depthPacking:Ia}),x=new Na,M={},T=t.maxTextureSize,E={[nn]:vt,[vt]:nn,[Rt]:Rt},g=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:Kf,fragmentShader:qf}),_=g.clone();_.defines.HORIZONTAL_PASS=1;const N=new Jn;N.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const P=new dt(N,g),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xr;let r=this.type;this.render=function(L,I,H){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||L.length===0)return;const h=e.getRenderTarget(),d=e.getActiveCubeFace(),C=e.getActiveMipmapLevel(),K=e.state;K.setBlending(Nt),K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const V=r!==At&&this.type===At,Y=r===At&&this.type!==At;for(let Q=0,W=L.length;Q<W;Q++){const ee=L[Q],F=ee.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const ve=F.getFrameExtents();if(s.multiply(ve),a.copy(F.mapSize),(s.x>T||s.y>T)&&(s.x>T&&(a.x=Math.floor(T/ve.x),s.x=a.x*ve.x,F.mapSize.x=a.x),s.y>T&&(a.y=Math.floor(T/ve.y),s.y=a.y*ve.y,F.mapSize.y=a.y)),F.map===null||V===!0||Y===!0){const we=this.type!==At?{minFilter:tn,magFilter:tn}:{};F.map!==null&&F.map.dispose(),F.map=new Kt(s.x,s.y,we),F.map.texture.name=ee.name+".shadowMap",F.camera.updateProjectionMatrix()}e.setRenderTarget(F.map),e.clear();const Ae=F.getViewportCount();for(let we=0;we<Ae;we++){const Ve=F.getViewport(we);u.set(a.x*Ve.x,a.y*Ve.y,a.x*Ve.z,a.y*Ve.w),K.viewport(u),F.updateMatrices(ee,we),i=F.getFrustum(),v(I,H,F.camera,ee,this.type)}F.isPointLightShadow!==!0&&this.type===At&&U(F,H),F.needsUpdate=!1}r=this.type,f.needsUpdate=!1,e.setRenderTarget(h,d,C)};function U(L,I){const H=n.update(P);g.defines.VSM_SAMPLES!==L.blurSamples&&(g.defines.VSM_SAMPLES=L.blurSamples,_.defines.VSM_SAMPLES=L.blurSamples,g.needsUpdate=!0,_.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Kt(s.x,s.y)),g.uniforms.shadow_pass.value=L.map.texture,g.uniforms.resolution.value=L.mapSize,g.uniforms.radius.value=L.radius,e.setRenderTarget(L.mapPass),e.clear(),e.renderBufferDirect(I,null,H,g,P,null),_.uniforms.shadow_pass.value=L.mapPass.texture,_.uniforms.resolution.value=L.mapSize,_.uniforms.radius.value=L.radius,e.setRenderTarget(L.map),e.clear(),e.renderBufferDirect(I,null,H,_,P,null)}function b(L,I,H,h){let d=null;const C=H.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(C!==void 0)d=C;else if(d=H.isPointLight===!0?x:c,e.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const K=d.uuid,V=I.uuid;let Y=M[K];Y===void 0&&(Y={},M[K]=Y);let Q=Y[V];Q===void 0&&(Q=d.clone(),Y[V]=Q,I.addEventListener("dispose",G)),d=Q}if(d.visible=I.visible,d.wireframe=I.wireframe,h===At?d.side=I.shadowSide!==null?I.shadowSide:I.side:d.side=I.shadowSide!==null?I.shadowSide:E[I.side],d.alphaMap=I.alphaMap,d.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,d.map=I.map,d.clipShadows=I.clipShadows,d.clippingPlanes=I.clippingPlanes,d.clipIntersection=I.clipIntersection,d.displacementMap=I.displacementMap,d.displacementScale=I.displacementScale,d.displacementBias=I.displacementBias,d.wireframeLinewidth=I.wireframeLinewidth,d.linewidth=I.linewidth,H.isPointLight===!0&&d.isMeshDistanceMaterial===!0){const K=e.properties.get(d);K.light=H}return d}function v(L,I,H,h,d){if(L.visible===!1)return;if(L.layers.test(I.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&d===At)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,L.matrixWorld);const V=n.update(L),Y=L.material;if(Array.isArray(Y)){const Q=V.groups;for(let W=0,ee=Q.length;W<ee;W++){const F=Q[W],ve=Y[F.materialIndex];if(ve&&ve.visible){const Ae=b(L,ve,h,d);L.onBeforeShadow(e,L,I,H,V,Ae,F),e.renderBufferDirect(H,null,V,Ae,L,F),L.onAfterShadow(e,L,I,H,V,Ae,F)}}}else if(Y.visible){const Q=b(L,Y,h,d);L.onBeforeShadow(e,L,I,H,V,Q,null),e.renderBufferDirect(H,null,V,Q,L,null),L.onAfterShadow(e,L,I,H,V,Q,null)}}const K=L.children;for(let V=0,Y=K.length;V<Y;V++)v(K[V],I,H,h,d)}function G(L){L.target.removeEventListener("dispose",G);for(const H in M){const h=M[H],d=L.target.uuid;d in h&&(h[d].dispose(),delete h[d])}}}const $f={[Kn]:Yn,[Xn]:kn,[Wn]:Vn,[En]:zn,[Yn]:Kn,[kn]:Xn,[Vn]:Wn,[zn]:En};function jf(e,n){function t(){let S=!1;const re=new mt;let Z=null;const ce=new mt(0,0,0,0);return{setMask:function($){Z!==$&&!S&&(e.colorMask($,$,$,$),Z=$)},setLocked:function($){S=$},setClear:function($,z,fe,De,Ke){Ke===!0&&($*=De,z*=De,fe*=De),re.set($,z,fe,De),ce.equals(re)===!1&&(e.clearColor($,z,fe,De),ce.copy(re))},reset:function(){S=!1,Z=null,ce.set(-1,0,0,0)}}}function i(){let S=!1,re=!1,Z=null,ce=null,$=null;return{setReversed:function(z){if(re!==z){const fe=n.get("EXT_clip_control");z?fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.ZERO_TO_ONE_EXT):fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.NEGATIVE_ONE_TO_ONE_EXT),re=z;const De=$;$=null,this.setClear(De)}},getReversed:function(){return re},setTest:function(z){z?oe(e.DEPTH_TEST):ge(e.DEPTH_TEST)},setMask:function(z){Z!==z&&!S&&(e.depthMask(z),Z=z)},setFunc:function(z){if(re&&(z=$f[z]),ce!==z){switch(z){case Kn:e.depthFunc(e.NEVER);break;case Yn:e.depthFunc(e.ALWAYS);break;case Xn:e.depthFunc(e.LESS);break;case En:e.depthFunc(e.LEQUAL);break;case Wn:e.depthFunc(e.EQUAL);break;case zn:e.depthFunc(e.GEQUAL);break;case kn:e.depthFunc(e.GREATER);break;case Vn:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ce=z}},setLocked:function(z){S=z},setClear:function(z){$!==z&&(re&&(z=1-z),e.clearDepth(z),$=z)},reset:function(){S=!1,Z=null,ce=null,$=null,re=!1}}}function s(){let S=!1,re=null,Z=null,ce=null,$=null,z=null,fe=null,De=null,Ke=null;return{setTest:function(ke){S||(ke?oe(e.STENCIL_TEST):ge(e.STENCIL_TEST))},setMask:function(ke){re!==ke&&!S&&(e.stencilMask(ke),re=ke)},setFunc:function(ke,Mt,xt){(Z!==ke||ce!==Mt||$!==xt)&&(e.stencilFunc(ke,Mt,xt),Z=ke,ce=Mt,$=xt)},setOp:function(ke,Mt,xt){(z!==ke||fe!==Mt||De!==xt)&&(e.stencilOp(ke,Mt,xt),z=ke,fe=Mt,De=xt)},setLocked:function(ke){S=ke},setClear:function(ke){Ke!==ke&&(e.clearStencil(ke),Ke=ke)},reset:function(){S=!1,re=null,Z=null,ce=null,$=null,z=null,fe=null,De=null,Ke=null}}}const a=new t,u=new i,c=new s,x=new WeakMap,M=new WeakMap;let T={},E={},g=new WeakMap,_=[],N=null,P=!1,f=null,r=null,U=null,b=null,v=null,G=null,L=null,I=new Qe(0,0,0),H=0,h=!1,d=null,C=null,K=null,V=null,Y=null;const Q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ee=0;const F=e.getParameter(e.VERSION);F.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(F)[1]),W=ee>=1):F.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),W=ee>=2);let ve=null,Ae={};const we=e.getParameter(e.SCISSOR_BOX),Ve=e.getParameter(e.VIEWPORT),nt=new mt().fromArray(we),k=new mt().fromArray(Ve);function J(S,re,Z,ce){const $=new Uint8Array(4),z=e.createTexture();e.bindTexture(S,z),e.texParameteri(S,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(S,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let fe=0;fe<Z;fe++)S===e.TEXTURE_3D||S===e.TEXTURE_2D_ARRAY?e.texImage3D(re,0,e.RGBA,1,1,ce,0,e.RGBA,e.UNSIGNED_BYTE,$):e.texImage2D(re+fe,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,$);return z}const _e={};_e[e.TEXTURE_2D]=J(e.TEXTURE_2D,e.TEXTURE_2D,1),_e[e.TEXTURE_CUBE_MAP]=J(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[e.TEXTURE_2D_ARRAY]=J(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),_e[e.TEXTURE_3D]=J(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),u.setClear(1),c.setClear(0),oe(e.DEPTH_TEST),u.setFunc(En),Ge(!1),Ye(Ni),oe(e.CULL_FACE),m(Nt);function oe(S){T[S]!==!0&&(e.enable(S),T[S]=!0)}function ge(S){T[S]!==!1&&(e.disable(S),T[S]=!1)}function Be(S,re){return E[S]!==re?(e.bindFramebuffer(S,re),E[S]=re,S===e.DRAW_FRAMEBUFFER&&(E[e.FRAMEBUFFER]=re),S===e.FRAMEBUFFER&&(E[e.DRAW_FRAMEBUFFER]=re),!0):!1}function Re(S,re){let Z=_,ce=!1;if(S){Z=g.get(re),Z===void 0&&(Z=[],g.set(re,Z));const $=S.textures;if(Z.length!==$.length||Z[0]!==e.COLOR_ATTACHMENT0){for(let z=0,fe=$.length;z<fe;z++)Z[z]=e.COLOR_ATTACHMENT0+z;Z.length=$.length,ce=!0}}else Z[0]!==e.BACK&&(Z[0]=e.BACK,ce=!0);ce&&e.drawBuffers(Z)}function Je(S){return N!==S?(e.useProgram(S),N=S,!0):!1}const et={[jt]:e.FUNC_ADD,[oa]:e.FUNC_SUBTRACT,[aa]:e.FUNC_REVERSE_SUBTRACT};et[_o]=e.MIN,et[go]=e.MAX;const He={[Ma]:e.ZERO,[Sa]:e.ONE,[Ea]:e.SRC_COLOR,[va]:e.SRC_ALPHA,[ga]:e.SRC_ALPHA_SATURATE,[_a]:e.DST_COLOR,[ma]:e.DST_ALPHA,[ha]:e.ONE_MINUS_SRC_COLOR,[pa]:e.ONE_MINUS_SRC_ALPHA,[ua]:e.ONE_MINUS_DST_COLOR,[da]:e.ONE_MINUS_DST_ALPHA,[fa]:e.CONSTANT_COLOR,[ca]:e.ONE_MINUS_CONSTANT_COLOR,[la]:e.CONSTANT_ALPHA,[sa]:e.ONE_MINUS_CONSTANT_ALPHA};function m(S,re,Z,ce,$,z,fe,De,Ke,ke){if(S===Nt){P===!0&&(ge(e.BLEND),P=!1);return}if(P===!1&&(oe(e.BLEND),P=!0),S!==Ya){if(S!==f||ke!==h){if((r!==jt||v!==jt)&&(e.blendEquation(e.FUNC_ADD),r=jt,v=jt),ke)switch(S){case _n:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Bi:e.blendFunc(e.ONE,e.ONE);break;case Fi:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Oi:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}else switch(S){case _n:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Bi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Fi:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oi:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}U=null,b=null,G=null,L=null,I.set(0,0,0),H=0,f=S,h=ke}return}$=$||re,z=z||Z,fe=fe||ce,(re!==r||$!==v)&&(e.blendEquationSeparate(et[re],et[$]),r=re,v=$),(Z!==U||ce!==b||z!==G||fe!==L)&&(e.blendFuncSeparate(He[Z],He[ce],He[z],He[fe]),U=Z,b=ce,G=z,L=fe),(De.equals(I)===!1||Ke!==H)&&(e.blendColor(De.r,De.g,De.b,Ke),I.copy(De),H=Ke),f=S,h=!1}function ct(S,re){S.side===Rt?ge(e.CULL_FACE):oe(e.CULL_FACE);let Z=S.side===vt;re&&(Z=!Z),Ge(Z),S.blending===_n&&S.transparent===!1?m(Nt):m(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),u.setFunc(S.depthFunc),u.setTest(S.depthTest),u.setMask(S.depthWrite),a.setMask(S.colorWrite);const ce=S.stencilWrite;c.setTest(ce),ce&&(c.setMask(S.stencilWriteMask),c.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),c.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),Ne(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?oe(e.SAMPLE_ALPHA_TO_COVERAGE):ge(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(S){d!==S&&(S?e.frontFace(e.CW):e.frontFace(e.CCW),d=S)}function Ye(S){S!==Wa?(oe(e.CULL_FACE),S!==C&&(S===Ni?e.cullFace(e.BACK):S===Xa?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):ge(e.CULL_FACE),C=S}function pe(S){S!==K&&(W&&e.lineWidth(S),K=S)}function Ne(S,re,Z){S?(oe(e.POLYGON_OFFSET_FILL),(V!==re||Y!==Z)&&(e.polygonOffset(re,Z),V=re,Y=Z)):ge(e.POLYGON_OFFSET_FILL)}function Se(S){S?oe(e.SCISSOR_TEST):ge(e.SCISSOR_TEST)}function Le(S){S===void 0&&(S=e.TEXTURE0+Q-1),ve!==S&&(e.activeTexture(S),ve=S)}function at(S,re,Z){Z===void 0&&(ve===null?Z=e.TEXTURE0+Q-1:Z=ve);let ce=Ae[Z];ce===void 0&&(ce={type:void 0,texture:void 0},Ae[Z]=ce),(ce.type!==S||ce.texture!==re)&&(ve!==Z&&(e.activeTexture(Z),ve=Z),e.bindTexture(S,re||_e[S]),ce.type=S,ce.texture=re)}function p(){const S=Ae[ve];S!==void 0&&S.type!==void 0&&(e.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function o(){try{e.compressedTexImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function D(){try{e.compressedTexImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function B(){try{e.texSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function X(){try{e.texSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function O(){try{e.compressedTexSubImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function he(){try{e.compressedTexSubImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ie(){try{e.texStorage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ue(){try{e.texStorage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function me(){try{e.texImage2D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function q(){try{e.texImage3D(...arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function se(S){nt.equals(S)===!1&&(e.scissor(S.x,S.y,S.z,S.w),nt.copy(S))}function xe(S){k.equals(S)===!1&&(e.viewport(S.x,S.y,S.z,S.w),k.copy(S))}function Te(S,re){let Z=M.get(re);Z===void 0&&(Z=new WeakMap,M.set(re,Z));let ce=Z.get(S);ce===void 0&&(ce=e.getUniformBlockIndex(re,S.name),Z.set(S,ce))}function te(S,re){const ce=M.get(re).get(S);x.get(re)!==ce&&(e.uniformBlockBinding(re,ce,S.__bindingPointIndex),x.set(re,ce))}function Pe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),u.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),T={},ve=null,Ae={},E={},g=new WeakMap,_=[],N=null,P=!1,f=null,r=null,U=null,b=null,v=null,G=null,L=null,I=new Qe(0,0,0),H=0,h=!1,d=null,C=null,K=null,V=null,Y=null,nt.set(0,0,e.canvas.width,e.canvas.height),k.set(0,0,e.canvas.width,e.canvas.height),a.reset(),u.reset(),c.reset()}return{buffers:{color:a,depth:u,stencil:c},enable:oe,disable:ge,bindFramebuffer:Be,drawBuffers:Re,useProgram:Je,setBlending:m,setMaterial:ct,setFlipSided:Ge,setCullFace:Ye,setLineWidth:pe,setPolygonOffset:Ne,setScissorTest:Se,activeTexture:Le,bindTexture:at,unbindTexture:p,compressedTexImage2D:o,compressedTexImage3D:D,texImage2D:me,texImage3D:q,updateUBOMapping:Te,uniformBlockBinding:te,texStorage2D:ie,texStorage3D:ue,texSubImage2D:B,texSubImage3D:X,compressedTexSubImage2D:O,compressedTexSubImage3D:he,scissor:se,viewport:xe,reset:Pe}}function Qf(e,n,t,i,s,a,u){const c=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,x=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),M=new $e,T=new WeakMap;let E;const g=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(p,o){return _?new OffscreenCanvas(p,o):uo("canvas")}function P(p,o,D){let B=1;const X=at(p);if((X.width>D||X.height>D)&&(B=D/Math.max(X.width,X.height)),B<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){const O=Math.floor(B*X.width),he=Math.floor(B*X.height);E===void 0&&(E=N(O,he));const ie=o?N(O,he):E;return ie.width=O,ie.height=he,ie.getContext("2d").drawImage(p,0,0,O,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+O+"x"+he+")."),ie}else return"data"in p&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),p;return p}function f(p){return p.generateMipmaps}function r(p){e.generateMipmap(p)}function U(p){return p.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?e.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(p,o,D,B,X=!1){if(p!==null){if(e[p]!==void 0)return e[p];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let O=o;if(o===e.RED&&(D===e.FLOAT&&(O=e.R32F),D===e.HALF_FLOAT&&(O=e.R16F),D===e.UNSIGNED_BYTE&&(O=e.R8)),o===e.RED_INTEGER&&(D===e.UNSIGNED_BYTE&&(O=e.R8UI),D===e.UNSIGNED_SHORT&&(O=e.R16UI),D===e.UNSIGNED_INT&&(O=e.R32UI),D===e.BYTE&&(O=e.R8I),D===e.SHORT&&(O=e.R16I),D===e.INT&&(O=e.R32I)),o===e.RG&&(D===e.FLOAT&&(O=e.RG32F),D===e.HALF_FLOAT&&(O=e.RG16F),D===e.UNSIGNED_BYTE&&(O=e.RG8)),o===e.RG_INTEGER&&(D===e.UNSIGNED_BYTE&&(O=e.RG8UI),D===e.UNSIGNED_SHORT&&(O=e.RG16UI),D===e.UNSIGNED_INT&&(O=e.RG32UI),D===e.BYTE&&(O=e.RG8I),D===e.SHORT&&(O=e.RG16I),D===e.INT&&(O=e.RG32I)),o===e.RGB_INTEGER&&(D===e.UNSIGNED_BYTE&&(O=e.RGB8UI),D===e.UNSIGNED_SHORT&&(O=e.RGB16UI),D===e.UNSIGNED_INT&&(O=e.RGB32UI),D===e.BYTE&&(O=e.RGB8I),D===e.SHORT&&(O=e.RGB16I),D===e.INT&&(O=e.RGB32I)),o===e.RGBA_INTEGER&&(D===e.UNSIGNED_BYTE&&(O=e.RGBA8UI),D===e.UNSIGNED_SHORT&&(O=e.RGBA16UI),D===e.UNSIGNED_INT&&(O=e.RGBA32UI),D===e.BYTE&&(O=e.RGBA8I),D===e.SHORT&&(O=e.RGBA16I),D===e.INT&&(O=e.RGBA32I)),o===e.RGB&&D===e.UNSIGNED_INT_5_9_9_9_REV&&(O=e.RGB9_E5),o===e.RGBA){const he=X?Nr:rt.getTransfer(B);D===e.FLOAT&&(O=e.RGBA32F),D===e.HALF_FLOAT&&(O=e.RGBA16F),D===e.UNSIGNED_BYTE&&(O=he===Ze?e.SRGB8_ALPHA8:e.RGBA8),D===e.UNSIGNED_SHORT_4_4_4_4&&(O=e.RGBA4),D===e.UNSIGNED_SHORT_5_5_5_1&&(O=e.RGB5_A1)}return(O===e.R16F||O===e.R32F||O===e.RG16F||O===e.RG32F||O===e.RGBA16F||O===e.RGBA32F)&&n.get("EXT_color_buffer_float"),O}function v(p,o){let D;return p?o===null||o===on||o===an?D=e.DEPTH24_STENCIL8:o===It?D=e.DEPTH32F_STENCIL8:o===Sn&&(D=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):o===null||o===on||o===an?D=e.DEPTH_COMPONENT24:o===It?D=e.DEPTH_COMPONENT32F:o===Sn&&(D=e.DEPTH_COMPONENT16),D}function G(p,o){return f(p)===!0||p.isFramebufferTexture&&p.minFilter!==tn&&p.minFilter!==kt?Math.log2(Math.max(o.width,o.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?o.mipmaps.length:1}function L(p){const o=p.target;o.removeEventListener("dispose",L),H(o),o.isVideoTexture&&T.delete(o)}function I(p){const o=p.target;o.removeEventListener("dispose",I),d(o)}function H(p){const o=i.get(p);if(o.__webglInit===void 0)return;const D=p.source,B=g.get(D);if(B){const X=B[o.__cacheKey];X.usedTimes--,X.usedTimes===0&&h(p),Object.keys(B).length===0&&g.delete(D)}i.remove(p)}function h(p){const o=i.get(p);e.deleteTexture(o.__webglTexture);const D=p.source,B=g.get(D);delete B[o.__cacheKey],u.memory.textures--}function d(p){const o=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(o.__webglFramebuffer[B]))for(let X=0;X<o.__webglFramebuffer[B].length;X++)e.deleteFramebuffer(o.__webglFramebuffer[B][X]);else e.deleteFramebuffer(o.__webglFramebuffer[B]);o.__webglDepthbuffer&&e.deleteRenderbuffer(o.__webglDepthbuffer[B])}else{if(Array.isArray(o.__webglFramebuffer))for(let B=0;B<o.__webglFramebuffer.length;B++)e.deleteFramebuffer(o.__webglFramebuffer[B]);else e.deleteFramebuffer(o.__webglFramebuffer);if(o.__webglDepthbuffer&&e.deleteRenderbuffer(o.__webglDepthbuffer),o.__webglMultisampledFramebuffer&&e.deleteFramebuffer(o.__webglMultisampledFramebuffer),o.__webglColorRenderbuffer)for(let B=0;B<o.__webglColorRenderbuffer.length;B++)o.__webglColorRenderbuffer[B]&&e.deleteRenderbuffer(o.__webglColorRenderbuffer[B]);o.__webglDepthRenderbuffer&&e.deleteRenderbuffer(o.__webglDepthRenderbuffer)}const D=p.textures;for(let B=0,X=D.length;B<X;B++){const O=i.get(D[B]);O.__webglTexture&&(e.deleteTexture(O.__webglTexture),u.memory.textures--),i.remove(D[B])}i.remove(p)}let C=0;function K(){C=0}function V(){const p=C;return p>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+p+" texture units while this GPU supports only "+s.maxTextures),C+=1,p}function Y(p){const o=[];return o.push(p.wrapS),o.push(p.wrapT),o.push(p.wrapR||0),o.push(p.magFilter),o.push(p.minFilter),o.push(p.anisotropy),o.push(p.internalFormat),o.push(p.format),o.push(p.type),o.push(p.generateMipmaps),o.push(p.premultiplyAlpha),o.push(p.flipY),o.push(p.unpackAlignment),o.push(p.colorSpace),o.join()}function Q(p,o){const D=i.get(p);if(p.isVideoTexture&&Se(p),p.isRenderTargetTexture===!1&&p.version>0&&D.__version!==p.version){const B=p.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{_e(D,p,o);return}}t.bindTexture(e.TEXTURE_2D,D.__webglTexture,e.TEXTURE0+o)}function W(p,o){const D=i.get(p);if(p.version>0&&D.__version!==p.version){_e(D,p,o);return}t.bindTexture(e.TEXTURE_2D_ARRAY,D.__webglTexture,e.TEXTURE0+o)}function ee(p,o){const D=i.get(p);if(p.version>0&&D.__version!==p.version){_e(D,p,o);return}t.bindTexture(e.TEXTURE_3D,D.__webglTexture,e.TEXTURE0+o)}function F(p,o){const D=i.get(p);if(p.version>0&&D.__version!==p.version){oe(D,p,o);return}t.bindTexture(e.TEXTURE_CUBE_MAP,D.__webglTexture,e.TEXTURE0+o)}const ve={[Aa]:e.REPEAT,[xa]:e.CLAMP_TO_EDGE,[Ta]:e.MIRRORED_REPEAT},Ae={[tn]:e.NEAREST,[Ra]:e.NEAREST_MIPMAP_NEAREST,[cn]:e.NEAREST_MIPMAP_LINEAR,[kt]:e.LINEAR,[Pn]:e.LINEAR_MIPMAP_NEAREST,[Qt]:e.LINEAR_MIPMAP_LINEAR},we={[wa]:e.NEVER,[Ua]:e.ALWAYS,[La]:e.LESS,[Mr]:e.LEQUAL,[Da]:e.EQUAL,[Pa]:e.GEQUAL,[Ca]:e.GREATER,[ba]:e.NOTEQUAL};function Ve(p,o){if(o.type===It&&n.has("OES_texture_float_linear")===!1&&(o.magFilter===kt||o.magFilter===Pn||o.magFilter===cn||o.magFilter===Qt||o.minFilter===kt||o.minFilter===Pn||o.minFilter===cn||o.minFilter===Qt)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(p,e.TEXTURE_WRAP_S,ve[o.wrapS]),e.texParameteri(p,e.TEXTURE_WRAP_T,ve[o.wrapT]),(p===e.TEXTURE_3D||p===e.TEXTURE_2D_ARRAY)&&e.texParameteri(p,e.TEXTURE_WRAP_R,ve[o.wrapR]),e.texParameteri(p,e.TEXTURE_MAG_FILTER,Ae[o.magFilter]),e.texParameteri(p,e.TEXTURE_MIN_FILTER,Ae[o.minFilter]),o.compareFunction&&(e.texParameteri(p,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(p,e.TEXTURE_COMPARE_FUNC,we[o.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(o.magFilter===tn||o.minFilter!==cn&&o.minFilter!==Qt||o.type===It&&n.has("OES_texture_float_linear")===!1)return;if(o.anisotropy>1||i.get(o).__currentAnisotropy){const D=n.get("EXT_texture_filter_anisotropic");e.texParameterf(p,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(o.anisotropy,s.getMaxAnisotropy())),i.get(o).__currentAnisotropy=o.anisotropy}}}function nt(p,o){let D=!1;p.__webglInit===void 0&&(p.__webglInit=!0,o.addEventListener("dispose",L));const B=o.source;let X=g.get(B);X===void 0&&(X={},g.set(B,X));const O=Y(o);if(O!==p.__cacheKey){X[O]===void 0&&(X[O]={texture:e.createTexture(),usedTimes:0},u.memory.textures++,D=!0),X[O].usedTimes++;const he=X[p.__cacheKey];he!==void 0&&(X[p.__cacheKey].usedTimes--,he.usedTimes===0&&h(o)),p.__cacheKey=O,p.__webglTexture=X[O].texture}return D}function k(p,o,D){return Math.floor(Math.floor(p/D)/o)}function J(p,o,D,B){const O=p.updateRanges;if(O.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,o.width,o.height,D,B,o.data);else{O.sort((q,se)=>q.start-se.start);let he=0;for(let q=1;q<O.length;q++){const se=O[he],xe=O[q],Te=se.start+se.count,te=k(xe.start,o.width,4),Pe=k(se.start,o.width,4);xe.start<=Te+1&&te===Pe&&k(xe.start+xe.count-1,o.width,4)===te?se.count=Math.max(se.count,xe.start+xe.count-se.start):(++he,O[he]=xe)}O.length=he+1;const ie=e.getParameter(e.UNPACK_ROW_LENGTH),ue=e.getParameter(e.UNPACK_SKIP_PIXELS),me=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,o.width);for(let q=0,se=O.length;q<se;q++){const xe=O[q],Te=Math.floor(xe.start/4),te=Math.ceil(xe.count/4),Pe=Te%o.width,S=Math.floor(Te/o.width),re=te,Z=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Pe),e.pixelStorei(e.UNPACK_SKIP_ROWS,S),t.texSubImage2D(e.TEXTURE_2D,0,Pe,S,re,Z,D,B,o.data)}p.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,ie),e.pixelStorei(e.UNPACK_SKIP_PIXELS,ue),e.pixelStorei(e.UNPACK_SKIP_ROWS,me)}}function _e(p,o,D){let B=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(B=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(B=e.TEXTURE_3D);const X=nt(p,o),O=o.source;t.bindTexture(B,p.__webglTexture,e.TEXTURE0+D);const he=i.get(O);if(O.version!==he.__version||X===!0){t.activeTexture(e.TEXTURE0+D);const ie=rt.getPrimaries(rt.workingColorSpace),ue=o.colorSpace===Vt?null:rt.getPrimaries(o.colorSpace),me=o.colorSpace===Vt||ie===ue?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let q=P(o.image,!1,s.maxTextureSize);q=Le(o,q);const se=a.convert(o.format,o.colorSpace),xe=a.convert(o.type);let Te=b(o.internalFormat,se,xe,o.colorSpace,o.isVideoTexture);Ve(B,o);let te;const Pe=o.mipmaps,S=o.isVideoTexture!==!0,re=he.__version===void 0||X===!0,Z=O.dataReady,ce=G(o,q);if(o.isDepthTexture)Te=v(o.format===vn,o.type),re&&(S?t.texStorage2D(e.TEXTURE_2D,1,Te,q.width,q.height):t.texImage2D(e.TEXTURE_2D,0,Te,q.width,q.height,0,se,xe,null));else if(o.isDataTexture)if(Pe.length>0){S&&re&&t.texStorage2D(e.TEXTURE_2D,ce,Te,Pe[0].width,Pe[0].height);for(let $=0,z=Pe.length;$<z;$++)te=Pe[$],S?Z&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,te.width,te.height,se,xe,te.data):t.texImage2D(e.TEXTURE_2D,$,Te,te.width,te.height,0,se,xe,te.data);o.generateMipmaps=!1}else S?(re&&t.texStorage2D(e.TEXTURE_2D,ce,Te,q.width,q.height),Z&&J(o,q,se,xe)):t.texImage2D(e.TEXTURE_2D,0,Te,q.width,q.height,0,se,xe,q.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){S&&re&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,Te,Pe[0].width,Pe[0].height,q.depth);for(let $=0,z=Pe.length;$<z;$++)if(te=Pe[$],o.format!==bt)if(se!==null)if(S){if(Z)if(o.layerUpdates.size>0){const fe=Gi(te.width,te.height,o.format,o.type);for(const De of o.layerUpdates){const Ke=te.data.subarray(De*fe/te.data.BYTES_PER_ELEMENT,(De+1)*fe/te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,De,te.width,te.height,1,se,Ke)}o.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,te.width,te.height,q.depth,se,te.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,Te,te.width,te.height,q.depth,0,te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else S?Z&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,te.width,te.height,q.depth,se,xe,te.data):t.texImage3D(e.TEXTURE_2D_ARRAY,$,Te,te.width,te.height,q.depth,0,se,xe,te.data)}else{S&&re&&t.texStorage2D(e.TEXTURE_2D,ce,Te,Pe[0].width,Pe[0].height);for(let $=0,z=Pe.length;$<z;$++)te=Pe[$],o.format!==bt?se!==null?S?Z&&t.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,te.width,te.height,se,te.data):t.compressedTexImage2D(e.TEXTURE_2D,$,Te,te.width,te.height,0,te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):S?Z&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,te.width,te.height,se,xe,te.data):t.texImage2D(e.TEXTURE_2D,$,Te,te.width,te.height,0,se,xe,te.data)}else if(o.isDataArrayTexture)if(S){if(re&&t.texStorage3D(e.TEXTURE_2D_ARRAY,ce,Te,q.width,q.height,q.depth),Z)if(o.layerUpdates.size>0){const $=Gi(q.width,q.height,o.format,o.type);for(const z of o.layerUpdates){const fe=q.data.subarray(z*$/q.data.BYTES_PER_ELEMENT,(z+1)*$/q.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,z,q.width,q.height,1,se,xe,fe)}o.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,se,xe,q.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,Te,q.width,q.height,q.depth,0,se,xe,q.data);else if(o.isData3DTexture)S?(re&&t.texStorage3D(e.TEXTURE_3D,ce,Te,q.width,q.height,q.depth),Z&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,se,xe,q.data)):t.texImage3D(e.TEXTURE_3D,0,Te,q.width,q.height,q.depth,0,se,xe,q.data);else if(o.isFramebufferTexture){if(re)if(S)t.texStorage2D(e.TEXTURE_2D,ce,Te,q.width,q.height);else{let $=q.width,z=q.height;for(let fe=0;fe<ce;fe++)t.texImage2D(e.TEXTURE_2D,fe,Te,$,z,0,se,xe,null),$>>=1,z>>=1}}else if(Pe.length>0){if(S&&re){const $=at(Pe[0]);t.texStorage2D(e.TEXTURE_2D,ce,Te,$.width,$.height)}for(let $=0,z=Pe.length;$<z;$++)te=Pe[$],S?Z&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,se,xe,te):t.texImage2D(e.TEXTURE_2D,$,Te,se,xe,te);o.generateMipmaps=!1}else if(S){if(re){const $=at(q);t.texStorage2D(e.TEXTURE_2D,ce,Te,$.width,$.height)}Z&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,se,xe,q)}else t.texImage2D(e.TEXTURE_2D,0,Te,se,xe,q);f(o)&&r(B),he.__version=O.version,o.onUpdate&&o.onUpdate(o)}p.__version=o.version}function oe(p,o,D){if(o.image.length!==6)return;const B=nt(p,o),X=o.source;t.bindTexture(e.TEXTURE_CUBE_MAP,p.__webglTexture,e.TEXTURE0+D);const O=i.get(X);if(X.version!==O.__version||B===!0){t.activeTexture(e.TEXTURE0+D);const he=rt.getPrimaries(rt.workingColorSpace),ie=o.colorSpace===Vt?null:rt.getPrimaries(o.colorSpace),ue=o.colorSpace===Vt||he===ie?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const me=o.isCompressedTexture||o.image[0].isCompressedTexture,q=o.image[0]&&o.image[0].isDataTexture,se=[];for(let z=0;z<6;z++)!me&&!q?se[z]=P(o.image[z],!0,s.maxCubemapSize):se[z]=q?o.image[z].image:o.image[z],se[z]=Le(o,se[z]);const xe=se[0],Te=a.convert(o.format,o.colorSpace),te=a.convert(o.type),Pe=b(o.internalFormat,Te,te,o.colorSpace),S=o.isVideoTexture!==!0,re=O.__version===void 0||B===!0,Z=X.dataReady;let ce=G(o,xe);Ve(e.TEXTURE_CUBE_MAP,o);let $;if(me){S&&re&&t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Pe,xe.width,xe.height);for(let z=0;z<6;z++){$=se[z].mipmaps;for(let fe=0;fe<$.length;fe++){const De=$[fe];o.format!==bt?Te!==null?S?Z&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe,0,0,De.width,De.height,Te,De.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe,Pe,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):S?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe,0,0,De.width,De.height,Te,te,De.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe,Pe,De.width,De.height,0,Te,te,De.data)}}}else{if($=o.mipmaps,S&&re){$.length>0&&ce++;const z=at(se[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,ce,Pe,z.width,z.height)}for(let z=0;z<6;z++)if(q){S?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,se[z].width,se[z].height,Te,te,se[z].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Pe,se[z].width,se[z].height,0,Te,te,se[z].data);for(let fe=0;fe<$.length;fe++){const Ke=$[fe].image[z].image;S?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe+1,0,0,Ke.width,Ke.height,Te,te,Ke.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe+1,Pe,Ke.width,Ke.height,0,Te,te,Ke.data)}}else{S?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,Te,te,se[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Pe,Te,te,se[z]);for(let fe=0;fe<$.length;fe++){const De=$[fe];S?Z&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe+1,0,0,Te,te,De.image[z]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe+1,Pe,Te,te,De.image[z])}}}f(o)&&r(e.TEXTURE_CUBE_MAP),O.__version=X.version,o.onUpdate&&o.onUpdate(o)}p.__version=o.version}function ge(p,o,D,B,X,O){const he=a.convert(D.format,D.colorSpace),ie=a.convert(D.type),ue=b(D.internalFormat,he,ie,D.colorSpace),me=i.get(o),q=i.get(D);if(q.__renderTarget=o,!me.__hasExternalTextures){const se=Math.max(1,o.width>>O),xe=Math.max(1,o.height>>O);X===e.TEXTURE_3D||X===e.TEXTURE_2D_ARRAY?t.texImage3D(X,O,ue,se,xe,o.depth,0,he,ie,null):t.texImage2D(X,O,ue,se,xe,0,he,ie,null)}t.bindFramebuffer(e.FRAMEBUFFER,p),Ne(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,B,X,q.__webglTexture,0,pe(o)):(X===e.TEXTURE_2D||X>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,B,X,q.__webglTexture,O),t.bindFramebuffer(e.FRAMEBUFFER,null)}function Be(p,o,D){if(e.bindRenderbuffer(e.RENDERBUFFER,p),o.depthBuffer){const B=o.depthTexture,X=B&&B.isDepthTexture?B.type:null,O=v(o.stencilBuffer,X),he=o.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=pe(o);Ne(o)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ie,O,o.width,o.height):D?e.renderbufferStorageMultisample(e.RENDERBUFFER,ie,O,o.width,o.height):e.renderbufferStorage(e.RENDERBUFFER,O,o.width,o.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,he,e.RENDERBUFFER,p)}else{const B=o.textures;for(let X=0;X<B.length;X++){const O=B[X],he=a.convert(O.format,O.colorSpace),ie=a.convert(O.type),ue=b(O.internalFormat,he,ie,O.colorSpace),me=pe(o);D&&Ne(o)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,me,ue,o.width,o.height):Ne(o)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,me,ue,o.width,o.height):e.renderbufferStorage(e.RENDERBUFFER,ue,o.width,o.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Re(p,o){if(o&&o.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,p),!(o.depthTexture&&o.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const B=i.get(o.depthTexture);B.__renderTarget=o,(!B.__webglTexture||o.depthTexture.image.width!==o.width||o.depthTexture.image.height!==o.height)&&(o.depthTexture.image.width=o.width,o.depthTexture.image.height=o.height,o.depthTexture.needsUpdate=!0),Q(o.depthTexture,0);const X=B.__webglTexture,O=pe(o);if(o.depthTexture.format===Qn)Ne(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,X,0,O):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,X,0);else if(o.depthTexture.format===vn)Ne(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,X,0,O):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function Je(p){const o=i.get(p),D=p.isWebGLCubeRenderTarget===!0;if(o.__boundDepthTexture!==p.depthTexture){const B=p.depthTexture;if(o.__depthDisposeCallback&&o.__depthDisposeCallback(),B){const X=()=>{delete o.__boundDepthTexture,delete o.__depthDisposeCallback,B.removeEventListener("dispose",X)};B.addEventListener("dispose",X),o.__depthDisposeCallback=X}o.__boundDepthTexture=B}if(p.depthTexture&&!o.__autoAllocateDepthBuffer){if(D)throw new Error("target.depthTexture not supported in Cube render targets");const B=p.texture.mipmaps;B&&B.length>0?Re(o.__webglFramebuffer[0],p):Re(o.__webglFramebuffer,p)}else if(D){o.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer[B]),o.__webglDepthbuffer[B]===void 0)o.__webglDepthbuffer[B]=e.createRenderbuffer(),Be(o.__webglDepthbuffer[B],p,!1);else{const X=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,O=o.__webglDepthbuffer[B];e.bindRenderbuffer(e.RENDERBUFFER,O),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,O)}}else{const B=p.texture.mipmaps;if(B&&B.length>0?t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer),o.__webglDepthbuffer===void 0)o.__webglDepthbuffer=e.createRenderbuffer(),Be(o.__webglDepthbuffer,p,!1);else{const X=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,O=o.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,O),e.framebufferRenderbuffer(e.FRAMEBUFFER,X,e.RENDERBUFFER,O)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function et(p,o,D){const B=i.get(p);o!==void 0&&ge(B.__webglFramebuffer,p,p.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),D!==void 0&&Je(p)}function He(p){const o=p.texture,D=i.get(p),B=i.get(o);p.addEventListener("dispose",I);const X=p.textures,O=p.isWebGLCubeRenderTarget===!0,he=X.length>1;if(he||(B.__webglTexture===void 0&&(B.__webglTexture=e.createTexture()),B.__version=o.version,u.memory.textures++),O){D.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(o.mipmaps&&o.mipmaps.length>0){D.__webglFramebuffer[ie]=[];for(let ue=0;ue<o.mipmaps.length;ue++)D.__webglFramebuffer[ie][ue]=e.createFramebuffer()}else D.__webglFramebuffer[ie]=e.createFramebuffer()}else{if(o.mipmaps&&o.mipmaps.length>0){D.__webglFramebuffer=[];for(let ie=0;ie<o.mipmaps.length;ie++)D.__webglFramebuffer[ie]=e.createFramebuffer()}else D.__webglFramebuffer=e.createFramebuffer();if(he)for(let ie=0,ue=X.length;ie<ue;ie++){const me=i.get(X[ie]);me.__webglTexture===void 0&&(me.__webglTexture=e.createTexture(),u.memory.textures++)}if(p.samples>0&&Ne(p)===!1){D.__webglMultisampledFramebuffer=e.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let ie=0;ie<X.length;ie++){const ue=X[ie];D.__webglColorRenderbuffer[ie]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,D.__webglColorRenderbuffer[ie]);const me=a.convert(ue.format,ue.colorSpace),q=a.convert(ue.type),se=b(ue.internalFormat,me,q,ue.colorSpace,p.isXRRenderTarget===!0),xe=pe(p);e.renderbufferStorageMultisample(e.RENDERBUFFER,xe,se,p.width,p.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ie,e.RENDERBUFFER,D.__webglColorRenderbuffer[ie])}e.bindRenderbuffer(e.RENDERBUFFER,null),p.depthBuffer&&(D.__webglDepthRenderbuffer=e.createRenderbuffer(),Be(D.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(O){t.bindTexture(e.TEXTURE_CUBE_MAP,B.__webglTexture),Ve(e.TEXTURE_CUBE_MAP,o);for(let ie=0;ie<6;ie++)if(o.mipmaps&&o.mipmaps.length>0)for(let ue=0;ue<o.mipmaps.length;ue++)ge(D.__webglFramebuffer[ie][ue],p,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ue);else ge(D.__webglFramebuffer[ie],p,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);f(o)&&r(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let ie=0,ue=X.length;ie<ue;ie++){const me=X[ie],q=i.get(me);t.bindTexture(e.TEXTURE_2D,q.__webglTexture),Ve(e.TEXTURE_2D,me),ge(D.__webglFramebuffer,p,me,e.COLOR_ATTACHMENT0+ie,e.TEXTURE_2D,0),f(me)&&r(e.TEXTURE_2D)}t.unbindTexture()}else{let ie=e.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(ie=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ie,B.__webglTexture),Ve(ie,o),o.mipmaps&&o.mipmaps.length>0)for(let ue=0;ue<o.mipmaps.length;ue++)ge(D.__webglFramebuffer[ue],p,o,e.COLOR_ATTACHMENT0,ie,ue);else ge(D.__webglFramebuffer,p,o,e.COLOR_ATTACHMENT0,ie,0);f(o)&&r(ie),t.unbindTexture()}p.depthBuffer&&Je(p)}function m(p){const o=p.textures;for(let D=0,B=o.length;D<B;D++){const X=o[D];if(f(X)){const O=U(p),he=i.get(X).__webglTexture;t.bindTexture(O,he),r(O),t.unbindTexture()}}}const ct=[],Ge=[];function Ye(p){if(p.samples>0){if(Ne(p)===!1){const o=p.textures,D=p.width,B=p.height;let X=e.COLOR_BUFFER_BIT;const O=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,he=i.get(p),ie=o.length>1;if(ie)for(let me=0;me<o.length;me++)t.bindFramebuffer(e.FRAMEBUFFER,he.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,he.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const ue=p.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let me=0;me<o.length;me++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(X|=e.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(X|=e.STENCIL_BUFFER_BIT)),ie){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,he.__webglColorRenderbuffer[me]);const q=i.get(o[me]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,q,0)}e.blitFramebuffer(0,0,D,B,0,0,D,B,X,e.NEAREST),x===!0&&(ct.length=0,Ge.length=0,ct.push(e.COLOR_ATTACHMENT0+me),p.depthBuffer&&p.resolveDepthBuffer===!1&&(ct.push(O),Ge.push(O),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ge)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ie)for(let me=0;me<o.length;me++){t.bindFramebuffer(e.FRAMEBUFFER,he.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.RENDERBUFFER,he.__webglColorRenderbuffer[me]);const q=i.get(o[me]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,he.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.TEXTURE_2D,q,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.resolveDepthBuffer===!1&&x){const o=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[o])}}}function pe(p){return Math.min(s.maxSamples,p.samples)}function Ne(p){const o=i.get(p);return p.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&o.__useRenderToTexture!==!1}function Se(p){const o=u.render.frame;T.get(p)!==o&&(T.set(p,o),p.update())}function Le(p,o){const D=p.colorSpace,B=p.format,X=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||D!==Tn&&D!==Vt&&(rt.getTransfer(D)===Ze?(B!==bt||X!==Ot)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",D)),o}function at(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(M.width=p.naturalWidth||p.width,M.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(M.width=p.displayWidth,M.height=p.displayHeight):(M.width=p.width,M.height=p.height),M}this.allocateTextureUnit=V,this.resetTextureUnits=K,this.setTexture2D=Q,this.setTexture2DArray=W,this.setTexture3D=ee,this.setTextureCube=F,this.rebindTextures=et,this.setupRenderTarget=He,this.updateRenderTargetMipmap=m,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Ne}function Jf(e,n){function t(i,s=Vt){let a;const u=rt.getTransfer(s);if(i===Ot)return e.UNSIGNED_BYTE;if(i===Ar)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Rr)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Oa)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Fa)return e.BYTE;if(i===Ba)return e.SHORT;if(i===Sn)return e.UNSIGNED_SHORT;if(i===Pr)return e.INT;if(i===on)return e.UNSIGNED_INT;if(i===It)return e.FLOAT;if(i===Mn)return e.HALF_FLOAT;if(i===Ha)return e.ALPHA;if(i===Ga)return e.RGB;if(i===bt)return e.RGBA;if(i===Qn)return e.DEPTH_COMPONENT;if(i===vn)return e.DEPTH_STENCIL;if(i===Va)return e.RED;if(i===Dr)return e.RED_INTEGER;if(i===ka)return e.RG;if(i===Lr)return e.RG_INTEGER;if(i===Ur)return e.RGBA_INTEGER;if(i===Dn||i===Ln||i===Un||i===wn)if(u===Ze)if(a=n.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Dn)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ln)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Un)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=n.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Dn)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ln)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Un)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wn)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ci||i===fi||i===di||i===ui)if(a=n.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===ci)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===fi)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===di)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ui)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===pi||i===hi||i===mi)if(a=n.get("WEBGL_compressed_texture_etc"),a!==null){if(i===pi||i===hi)return u===Ze?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===mi)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===_i||i===gi||i===vi||i===Ei||i===Si||i===Mi||i===Ti||i===xi||i===Ai||i===Ri||i===bi||i===Ci||i===Pi||i===Di)if(a=n.get("WEBGL_compressed_texture_astc"),a!==null){if(i===_i)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===gi)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===vi)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ei)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Si)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Mi)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ti)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xi)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ai)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ri)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===bi)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ci)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Pi)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Di)return u===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===yn||i===Li||i===Ui)if(a=n.get("EXT_texture_compression_bptc"),a!==null){if(i===yn)return u===Ze?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Li)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ui)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===za||i===wi||i===yi||i===Ii)if(a=n.get("EXT_texture_compression_rgtc"),a!==null){if(i===yn)return a.COMPRESSED_RED_RGTC1_EXT;if(i===wi)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===yi)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ii)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===an?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const ed=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,td=`
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

}`;class nd{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t,i){if(this.texture===null){const s=new br,a=n.properties.get(s);a.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Ft({vertexShader:ed,fragmentShader:td,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dt(new Cr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class id extends na{constructor(n,t){super();const i=this;let s=null,a=1,u=null,c="local-floor",x=1,M=null,T=null,E=null,g=null,_=null,N=null;const P=new nd,f=t.getContextAttributes();let r=null,U=null;const b=[],v=[],G=new $e;let L=null;const I=new mn;I.viewport=new mt;const H=new mn;H.viewport=new mt;const h=[I,H],d=new ia;let C=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let J=b[k];return J===void 0&&(J=new Cn,b[k]=J),J.getTargetRaySpace()},this.getControllerGrip=function(k){let J=b[k];return J===void 0&&(J=new Cn,b[k]=J),J.getGripSpace()},this.getHand=function(k){let J=b[k];return J===void 0&&(J=new Cn,b[k]=J),J.getHandSpace()};function V(k){const J=v.indexOf(k.inputSource);if(J===-1)return;const _e=b[J];_e!==void 0&&(_e.update(k.inputSource,k.frame,M||u),_e.dispatchEvent({type:k.type,data:k.inputSource}))}function Y(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",Q);for(let k=0;k<b.length;k++){const J=v[k];J!==null&&(v[k]=null,b[k].disconnect(J))}C=null,K=null,P.reset(),n.setRenderTarget(r),_=null,g=null,E=null,s=null,U=null,nt.stop(),i.isPresenting=!1,n.setPixelRatio(L),n.setSize(G.width,G.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){a=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){c=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return M||u},this.setReferenceSpace=function(k){M=k},this.getBaseLayer=function(){return g!==null?g:_},this.getBinding=function(){return E},this.getFrame=function(){return N},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(r=n.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",Q),f.xrCompatible!==!0&&await t.makeXRCompatible(),L=n.getPixelRatio(),n.getSize(G),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,oe=null,ge=null;f.depth&&(ge=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=f.stencil?vn:Qn,oe=f.stencil?an:on);const Be={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:a};E=new XRWebGLBinding(s,t),g=E.createProjectionLayer(Be),s.updateRenderState({layers:[g]}),n.setPixelRatio(1),n.setSize(g.textureWidth,g.textureHeight,!1),U=new Kt(g.textureWidth,g.textureHeight,{format:bt,type:Ot,depthTexture:new Sr(g.textureWidth,g.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:f.stencil,colorSpace:n.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const _e={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:a};_=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:_}),n.setPixelRatio(1),n.setSize(_.framebufferWidth,_.framebufferHeight,!1),U=new Kt(_.framebufferWidth,_.framebufferHeight,{format:bt,type:Ot,colorSpace:n.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}U.isXRRenderTarget=!0,this.setFoveation(x),M=null,u=await s.requestReferenceSpace(c),nt.setContext(s),nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return P.getDepthTexture()};function Q(k){for(let J=0;J<k.removed.length;J++){const _e=k.removed[J],oe=v.indexOf(_e);oe>=0&&(v[oe]=null,b[oe].disconnect(_e))}for(let J=0;J<k.added.length;J++){const _e=k.added[J];let oe=v.indexOf(_e);if(oe===-1){for(let Be=0;Be<b.length;Be++)if(Be>=v.length){v.push(_e),oe=Be;break}else if(v[Be]===null){v[Be]=_e,oe=Be;break}if(oe===-1)break}const ge=b[oe];ge&&ge.connect(_e)}}const W=new ye,ee=new ye;function F(k,J,_e){W.setFromMatrixPosition(J.matrixWorld),ee.setFromMatrixPosition(_e.matrixWorld);const oe=W.distanceTo(ee),ge=J.projectionMatrix.elements,Be=_e.projectionMatrix.elements,Re=ge[14]/(ge[10]-1),Je=ge[14]/(ge[10]+1),et=(ge[9]+1)/ge[5],He=(ge[9]-1)/ge[5],m=(ge[8]-1)/ge[0],ct=(Be[8]+1)/Be[0],Ge=Re*m,Ye=Re*ct,pe=oe/(-m+ct),Ne=pe*-m;if(J.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Ne),k.translateZ(pe),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),ge[10]===-1)k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Se=Re+pe,Le=Je+pe,at=Ge-Ne,p=Ye+(oe-Ne),o=et*Je/Le*Se,D=He*Je/Le*Se;k.projectionMatrix.makePerspective(at,p,o,D,Se,Le),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function ve(k,J){J===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(J.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let J=k.near,_e=k.far;P.texture!==null&&(P.depthNear>0&&(J=P.depthNear),P.depthFar>0&&(_e=P.depthFar)),d.near=H.near=I.near=J,d.far=H.far=I.far=_e,(C!==d.near||K!==d.far)&&(s.updateRenderState({depthNear:d.near,depthFar:d.far}),C=d.near,K=d.far),I.layers.mask=k.layers.mask|2,H.layers.mask=k.layers.mask|4,d.layers.mask=I.layers.mask|H.layers.mask;const oe=k.parent,ge=d.cameras;ve(d,oe);for(let Be=0;Be<ge.length;Be++)ve(ge[Be],oe);ge.length===2?F(d,I,H):d.projectionMatrix.copy(I.projectionMatrix),Ae(k,d,oe)};function Ae(k,J,_e){_e===null?k.matrix.copy(J.matrixWorld):(k.matrix.copy(_e.matrixWorld),k.matrix.invert(),k.matrix.multiply(J.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=ra*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return d},this.getFoveation=function(){if(!(g===null&&_===null))return x},this.setFoveation=function(k){x=k,g!==null&&(g.fixedFoveation=k),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=k)},this.hasDepthSensing=function(){return P.texture!==null},this.getDepthSensingMesh=function(){return P.getMesh(d)};let we=null;function Ve(k,J){if(T=J.getViewerPose(M||u),N=J,T!==null){const _e=T.views;_!==null&&(n.setRenderTargetFramebuffer(U,_.framebuffer),n.setRenderTarget(U));let oe=!1;_e.length!==d.cameras.length&&(d.cameras.length=0,oe=!0);for(let Re=0;Re<_e.length;Re++){const Je=_e[Re];let et=null;if(_!==null)et=_.getViewport(Je);else{const m=E.getViewSubImage(g,Je);et=m.viewport,Re===0&&(n.setRenderTargetTextures(U,m.colorTexture,m.depthStencilTexture),n.setRenderTarget(U))}let He=h[Re];He===void 0&&(He=new mn,He.layers.enable(Re),He.viewport=new mt,h[Re]=He),He.matrix.fromArray(Je.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Je.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(et.x,et.y,et.width,et.height),Re===0&&(d.matrix.copy(He.matrix),d.matrix.decompose(d.position,d.quaternion,d.scale)),oe===!0&&d.cameras.push(He)}const ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){const Re=E.getDepthInformation(_e[0]);Re&&Re.isValid&&Re.texture&&P.init(n,Re,s.renderState)}}for(let _e=0;_e<b.length;_e++){const oe=v[_e],ge=b[_e];oe!==null&&ge!==void 0&&ge.update(oe,J,M||u)}we&&we(k,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),N=null}const nt=new Or;nt.setAnimationLoop(Ve),this.setAnimationLoop=function(k){we=k},this.dispose=function(){}}}const Ut=new Ir,rd=new Yt;function ad(e,n){function t(f,r){f.matrixAutoUpdate===!0&&f.updateMatrix(),r.value.copy(f.matrix)}function i(f,r){r.color.getRGB(f.fogColor.value,yr(e)),r.isFog?(f.fogNear.value=r.near,f.fogFar.value=r.far):r.isFogExp2&&(f.fogDensity.value=r.density)}function s(f,r,U,b,v){r.isMeshBasicMaterial||r.isMeshLambertMaterial?a(f,r):r.isMeshToonMaterial?(a(f,r),E(f,r)):r.isMeshPhongMaterial?(a(f,r),T(f,r)):r.isMeshStandardMaterial?(a(f,r),g(f,r),r.isMeshPhysicalMaterial&&_(f,r,v)):r.isMeshMatcapMaterial?(a(f,r),N(f,r)):r.isMeshDepthMaterial?a(f,r):r.isMeshDistanceMaterial?(a(f,r),P(f,r)):r.isMeshNormalMaterial?a(f,r):r.isLineBasicMaterial?(u(f,r),r.isLineDashedMaterial&&c(f,r)):r.isPointsMaterial?x(f,r,U,b):r.isSpriteMaterial?M(f,r):r.isShadowMaterial?(f.color.value.copy(r.color),f.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)}function a(f,r){f.opacity.value=r.opacity,r.color&&f.diffuse.value.copy(r.color),r.emissive&&f.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(f.map.value=r.map,t(r.map,f.mapTransform)),r.alphaMap&&(f.alphaMap.value=r.alphaMap,t(r.alphaMap,f.alphaMapTransform)),r.bumpMap&&(f.bumpMap.value=r.bumpMap,t(r.bumpMap,f.bumpMapTransform),f.bumpScale.value=r.bumpScale,r.side===vt&&(f.bumpScale.value*=-1)),r.normalMap&&(f.normalMap.value=r.normalMap,t(r.normalMap,f.normalMapTransform),f.normalScale.value.copy(r.normalScale),r.side===vt&&f.normalScale.value.negate()),r.displacementMap&&(f.displacementMap.value=r.displacementMap,t(r.displacementMap,f.displacementMapTransform),f.displacementScale.value=r.displacementScale,f.displacementBias.value=r.displacementBias),r.emissiveMap&&(f.emissiveMap.value=r.emissiveMap,t(r.emissiveMap,f.emissiveMapTransform)),r.specularMap&&(f.specularMap.value=r.specularMap,t(r.specularMap,f.specularMapTransform)),r.alphaTest>0&&(f.alphaTest.value=r.alphaTest);const U=n.get(r),b=U.envMap,v=U.envMapRotation;b&&(f.envMap.value=b,Ut.copy(v),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),f.envMapRotation.value.setFromMatrix4(rd.makeRotationFromEuler(Ut)),f.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=r.reflectivity,f.ior.value=r.ior,f.refractionRatio.value=r.refractionRatio),r.lightMap&&(f.lightMap.value=r.lightMap,f.lightMapIntensity.value=r.lightMapIntensity,t(r.lightMap,f.lightMapTransform)),r.aoMap&&(f.aoMap.value=r.aoMap,f.aoMapIntensity.value=r.aoMapIntensity,t(r.aoMap,f.aoMapTransform))}function u(f,r){f.diffuse.value.copy(r.color),f.opacity.value=r.opacity,r.map&&(f.map.value=r.map,t(r.map,f.mapTransform))}function c(f,r){f.dashSize.value=r.dashSize,f.totalSize.value=r.dashSize+r.gapSize,f.scale.value=r.scale}function x(f,r,U,b){f.diffuse.value.copy(r.color),f.opacity.value=r.opacity,f.size.value=r.size*U,f.scale.value=b*.5,r.map&&(f.map.value=r.map,t(r.map,f.uvTransform)),r.alphaMap&&(f.alphaMap.value=r.alphaMap,t(r.alphaMap,f.alphaMapTransform)),r.alphaTest>0&&(f.alphaTest.value=r.alphaTest)}function M(f,r){f.diffuse.value.copy(r.color),f.opacity.value=r.opacity,f.rotation.value=r.rotation,r.map&&(f.map.value=r.map,t(r.map,f.mapTransform)),r.alphaMap&&(f.alphaMap.value=r.alphaMap,t(r.alphaMap,f.alphaMapTransform)),r.alphaTest>0&&(f.alphaTest.value=r.alphaTest)}function T(f,r){f.specular.value.copy(r.specular),f.shininess.value=Math.max(r.shininess,1e-4)}function E(f,r){r.gradientMap&&(f.gradientMap.value=r.gradientMap)}function g(f,r){f.metalness.value=r.metalness,r.metalnessMap&&(f.metalnessMap.value=r.metalnessMap,t(r.metalnessMap,f.metalnessMapTransform)),f.roughness.value=r.roughness,r.roughnessMap&&(f.roughnessMap.value=r.roughnessMap,t(r.roughnessMap,f.roughnessMapTransform)),r.envMap&&(f.envMapIntensity.value=r.envMapIntensity)}function _(f,r,U){f.ior.value=r.ior,r.sheen>0&&(f.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),f.sheenRoughness.value=r.sheenRoughness,r.sheenColorMap&&(f.sheenColorMap.value=r.sheenColorMap,t(r.sheenColorMap,f.sheenColorMapTransform)),r.sheenRoughnessMap&&(f.sheenRoughnessMap.value=r.sheenRoughnessMap,t(r.sheenRoughnessMap,f.sheenRoughnessMapTransform))),r.clearcoat>0&&(f.clearcoat.value=r.clearcoat,f.clearcoatRoughness.value=r.clearcoatRoughness,r.clearcoatMap&&(f.clearcoatMap.value=r.clearcoatMap,t(r.clearcoatMap,f.clearcoatMapTransform)),r.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=r.clearcoatRoughnessMap,t(r.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),r.clearcoatNormalMap&&(f.clearcoatNormalMap.value=r.clearcoatNormalMap,t(r.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),r.side===vt&&f.clearcoatNormalScale.value.negate())),r.dispersion>0&&(f.dispersion.value=r.dispersion),r.iridescence>0&&(f.iridescence.value=r.iridescence,f.iridescenceIOR.value=r.iridescenceIOR,f.iridescenceThicknessMinimum.value=r.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=r.iridescenceThicknessRange[1],r.iridescenceMap&&(f.iridescenceMap.value=r.iridescenceMap,t(r.iridescenceMap,f.iridescenceMapTransform)),r.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=r.iridescenceThicknessMap,t(r.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),r.transmission>0&&(f.transmission.value=r.transmission,f.transmissionSamplerMap.value=U.texture,f.transmissionSamplerSize.value.set(U.width,U.height),r.transmissionMap&&(f.transmissionMap.value=r.transmissionMap,t(r.transmissionMap,f.transmissionMapTransform)),f.thickness.value=r.thickness,r.thicknessMap&&(f.thicknessMap.value=r.thicknessMap,t(r.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=r.attenuationDistance,f.attenuationColor.value.copy(r.attenuationColor)),r.anisotropy>0&&(f.anisotropyVector.value.set(r.anisotropy*Math.cos(r.anisotropyRotation),r.anisotropy*Math.sin(r.anisotropyRotation)),r.anisotropyMap&&(f.anisotropyMap.value=r.anisotropyMap,t(r.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=r.specularIntensity,f.specularColor.value.copy(r.specularColor),r.specularColorMap&&(f.specularColorMap.value=r.specularColorMap,t(r.specularColorMap,f.specularColorMapTransform)),r.specularIntensityMap&&(f.specularIntensityMap.value=r.specularIntensityMap,t(r.specularIntensityMap,f.specularIntensityMapTransform))}function N(f,r){r.matcap&&(f.matcap.value=r.matcap)}function P(f,r){const U=n.get(r).light;f.referencePosition.value.setFromMatrixPosition(U.matrixWorld),f.nearDistance.value=U.shadow.camera.near,f.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function od(e,n,t,i){let s={},a={},u=[];const c=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function x(U,b){const v=b.program;i.uniformBlockBinding(U,v)}function M(U,b){let v=s[U.id];v===void 0&&(N(U),v=T(U),s[U.id]=v,U.addEventListener("dispose",f));const G=b.program;i.updateUBOMapping(U,G);const L=n.render.frame;a[U.id]!==L&&(g(U),a[U.id]=L)}function T(U){const b=E();U.__bindingPointIndex=b;const v=e.createBuffer(),G=U.__size,L=U.usage;return e.bindBuffer(e.UNIFORM_BUFFER,v),e.bufferData(e.UNIFORM_BUFFER,G,L),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,b,v),v}function E(){for(let U=0;U<c;U++)if(u.indexOf(U)===-1)return u.push(U),U;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(U){const b=s[U.id],v=U.uniforms,G=U.__cache;e.bindBuffer(e.UNIFORM_BUFFER,b);for(let L=0,I=v.length;L<I;L++){const H=Array.isArray(v[L])?v[L]:[v[L]];for(let h=0,d=H.length;h<d;h++){const C=H[h];if(_(C,L,h,G)===!0){const K=C.__offset,V=Array.isArray(C.value)?C.value:[C.value];let Y=0;for(let Q=0;Q<V.length;Q++){const W=V[Q],ee=P(W);typeof W=="number"||typeof W=="boolean"?(C.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,K+Y,C.__data)):W.isMatrix3?(C.__data[0]=W.elements[0],C.__data[1]=W.elements[1],C.__data[2]=W.elements[2],C.__data[3]=0,C.__data[4]=W.elements[3],C.__data[5]=W.elements[4],C.__data[6]=W.elements[5],C.__data[7]=0,C.__data[8]=W.elements[6],C.__data[9]=W.elements[7],C.__data[10]=W.elements[8],C.__data[11]=0):(W.toArray(C.__data,Y),Y+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,K,C.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function _(U,b,v,G){const L=U.value,I=b+"_"+v;if(G[I]===void 0)return typeof L=="number"||typeof L=="boolean"?G[I]=L:G[I]=L.clone(),!0;{const H=G[I];if(typeof L=="number"||typeof L=="boolean"){if(H!==L)return G[I]=L,!0}else if(H.equals(L)===!1)return H.copy(L),!0}return!1}function N(U){const b=U.uniforms;let v=0;const G=16;for(let I=0,H=b.length;I<H;I++){const h=Array.isArray(b[I])?b[I]:[b[I]];for(let d=0,C=h.length;d<C;d++){const K=h[d],V=Array.isArray(K.value)?K.value:[K.value];for(let Y=0,Q=V.length;Y<Q;Y++){const W=V[Y],ee=P(W),F=v%G,ve=F%ee.boundary,Ae=F+ve;v+=ve,Ae!==0&&G-Ae<ee.storage&&(v+=G-Ae),K.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=v,v+=ee.storage}}}const L=v%G;return L>0&&(v+=G-L),U.__size=v,U.__cache={},this}function P(U){const b={boundary:0,storage:0};return typeof U=="number"||typeof U=="boolean"?(b.boundary=4,b.storage=4):U.isVector2?(b.boundary=8,b.storage=8):U.isVector3||U.isColor?(b.boundary=16,b.storage=12):U.isVector4?(b.boundary=16,b.storage=16):U.isMatrix3?(b.boundary=48,b.storage=48):U.isMatrix4?(b.boundary=64,b.storage=64):U.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",U),b}function f(U){const b=U.target;b.removeEventListener("dispose",f);const v=u.indexOf(b.__bindingPointIndex);u.splice(v,1),e.deleteBuffer(s[b.id]),delete s[b.id],delete a[b.id]}function r(){for(const U in s)e.deleteBuffer(s[U]);u=[],s={},a={}}return{bind:x,update:M,dispose:r}}class Md{constructor(n={}){const{canvas:t=qr(),context:i=null,depth:s=!0,stencil:a=!1,alpha:u=!1,antialias:c=!1,premultipliedAlpha:x=!0,preserveDrawingBuffer:M=!1,powerPreference:T="default",failIfMajorPerformanceCaveat:E=!1,reverseDepthBuffer:g=!1}=n;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=u;const N=new Uint32Array(4),P=new Int32Array(4);let f=null,r=null;const U=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ct,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let G=!1;this._outputColorSpace=Zr;let L=0,I=0,H=null,h=-1,d=null;const C=new mt,K=new mt;let V=null;const Y=new Qe(0);let Q=0,W=t.width,ee=t.height,F=1,ve=null,Ae=null;const we=new mt(0,0,W,ee),Ve=new mt(0,0,W,ee);let nt=!1;const k=new vr;let J=!1,_e=!1;const oe=new Yt,ge=new Yt,Be=new ye,Re=new mt,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function He(){return H===null?F:1}let m=i;function ct(l,A){return t.getContext(l,A)}try{const l={alpha:!0,depth:s,stencil:a,antialias:c,premultipliedAlpha:x,preserveDrawingBuffer:M,powerPreference:T,failIfMajorPerformanceCaveat:E};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$r}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",$,!1),t.addEventListener("webglcontextcreationerror",z,!1),m===null){const A="webgl2";if(m=ct(A,l),m===null)throw ct(A)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(l){throw console.error("THREE.WebGLRenderer: "+l.message),l}let Ge,Ye,pe,Ne,Se,Le,at,p,o,D,B,X,O,he,ie,ue,me,q,se,xe,Te,te,Pe,S;function re(){Ge=new _c(m),Ge.init(),te=new Jf(m,Ge),Ye=new cc(m,Ge,n,te),pe=new jf(m,Ge),Ye.reverseDepthBuffer&&g&&pe.buffers.depth.setReversed(!0),Ne=new Ec(m),Se=new Bf,Le=new Qf(m,Ge,pe,Se,Ye,te,Ne),at=new dc(v),p=new mc(v),o=new Ro(m),Pe=new sc(m,o),D=new gc(m,o,Ne,Pe),B=new Mc(m,D,o,Ne),se=new Sc(m,Ye,Le),ue=new fc(Se),X=new Ff(v,at,p,Ge,Ye,Pe,ue),O=new ad(v,Se),he=new Gf,ie=new Yf(Ge),q=new oc(v,at,p,pe,B,_,x),me=new Zf(v,B,Ye),S=new od(m,Ne,Ye,pe),xe=new lc(m,Ge,Ne),Te=new vc(m,Ge,Ne),Ne.programs=X.programs,v.capabilities=Ye,v.extensions=Ge,v.properties=Se,v.renderLists=he,v.shadowMap=me,v.state=pe,v.info=Ne}re();const Z=new id(v,m);this.xr=Z,this.getContext=function(){return m},this.getContextAttributes=function(){return m.getContextAttributes()},this.forceContextLoss=function(){const l=Ge.get("WEBGL_lose_context");l&&l.loseContext()},this.forceContextRestore=function(){const l=Ge.get("WEBGL_lose_context");l&&l.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(l){l!==void 0&&(F=l,this.setSize(W,ee,!1))},this.getSize=function(l){return l.set(W,ee)},this.setSize=function(l,A,w=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=l,ee=A,t.width=Math.floor(l*F),t.height=Math.floor(A*F),w===!0&&(t.style.width=l+"px",t.style.height=A+"px"),this.setViewport(0,0,l,A)},this.getDrawingBufferSize=function(l){return l.set(W*F,ee*F).floor()},this.setDrawingBufferSize=function(l,A,w){W=l,ee=A,F=w,t.width=Math.floor(l*w),t.height=Math.floor(A*w),this.setViewport(0,0,l,A)},this.getCurrentViewport=function(l){return l.copy(C)},this.getViewport=function(l){return l.copy(we)},this.setViewport=function(l,A,w,y){l.isVector4?we.set(l.x,l.y,l.z,l.w):we.set(l,A,w,y),pe.viewport(C.copy(we).multiplyScalar(F).round())},this.getScissor=function(l){return l.copy(Ve)},this.setScissor=function(l,A,w,y){l.isVector4?Ve.set(l.x,l.y,l.z,l.w):Ve.set(l,A,w,y),pe.scissor(K.copy(Ve).multiplyScalar(F).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(l){pe.setScissorTest(nt=l)},this.setOpaqueSort=function(l){ve=l},this.setTransparentSort=function(l){Ae=l},this.getClearColor=function(l){return l.copy(q.getClearColor())},this.setClearColor=function(){q.setClearColor(...arguments)},this.getClearAlpha=function(){return q.getClearAlpha()},this.setClearAlpha=function(){q.setClearAlpha(...arguments)},this.clear=function(l=!0,A=!0,w=!0){let y=0;if(l){let R=!1;if(H!==null){const j=H.texture.format;R=j===Ur||j===Lr||j===Dr}if(R){const j=H.texture.type,ae=j===Ot||j===on||j===Sn||j===an||j===Ar||j===Rr,de=q.getClearColor(),le=q.getClearAlpha(),be=de.r,Ce=de.g,Ee=de.b;ae?(N[0]=be,N[1]=Ce,N[2]=Ee,N[3]=le,m.clearBufferuiv(m.COLOR,0,N)):(P[0]=be,P[1]=Ce,P[2]=Ee,P[3]=le,m.clearBufferiv(m.COLOR,0,P))}else y|=m.COLOR_BUFFER_BIT}A&&(y|=m.DEPTH_BUFFER_BIT),w&&(y|=m.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),m.clear(y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",$,!1),t.removeEventListener("webglcontextcreationerror",z,!1),q.dispose(),he.dispose(),ie.dispose(),Se.dispose(),at.dispose(),p.dispose(),B.dispose(),Pe.dispose(),S.dispose(),X.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",ni),Z.removeEventListener("sessionend",ii),Pt.stop()};function ce(l){l.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),G=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),G=!1;const l=Ne.autoReset,A=me.enabled,w=me.autoUpdate,y=me.needsUpdate,R=me.type;re(),Ne.autoReset=l,me.enabled=A,me.autoUpdate=w,me.needsUpdate=y,me.type=R}function z(l){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",l.statusMessage)}function fe(l){const A=l.target;A.removeEventListener("dispose",fe),De(A)}function De(l){Ke(l),Se.remove(l)}function Ke(l){const A=Se.get(l).programs;A!==void 0&&(A.forEach(function(w){X.releaseProgram(w)}),l.isShaderMaterial&&X.releaseShaderCache(l))}this.renderBufferDirect=function(l,A,w,y,R,j){A===null&&(A=Je);const ae=R.isMesh&&R.matrixWorld.determinant()<0,de=kr(l,A,w,y,R);pe.setMaterial(y,ae);let le=w.index,be=1;if(y.wireframe===!0){if(le=D.getWireframeAttribute(w),le===void 0)return;be=2}const Ce=w.drawRange,Ee=w.attributes.position;let Ie=Ce.start*be,ze=(Ce.start+Ce.count)*be;j!==null&&(Ie=Math.max(Ie,j.start*be),ze=Math.min(ze,(j.start+j.count)*be)),le!==null?(Ie=Math.max(Ie,0),ze=Math.min(ze,le.count)):Ee!=null&&(Ie=Math.max(Ie,0),ze=Math.min(ze,Ee.count));const it=ze-Ie;if(it<0||it===1/0)return;Pe.setup(R,y,de,w,le);let qe,Xe=xe;if(le!==null&&(qe=o.get(le),Xe=Te,Xe.setIndex(qe)),R.isMesh)y.wireframe===!0?(pe.setLineWidth(y.wireframeLinewidth*He()),Xe.setMode(m.LINES)):Xe.setMode(m.TRIANGLES);else if(R.isLine){let Me=y.linewidth;Me===void 0&&(Me=1),pe.setLineWidth(Me*He()),R.isLineSegments?Xe.setMode(m.LINES):R.isLineLoop?Xe.setMode(m.LINE_LOOP):Xe.setMode(m.LINE_STRIP)}else R.isPoints?Xe.setMode(m.POINTS):R.isSprite&&Xe.setMode(m.TRIANGLES);if(R.isBatchedMesh)if(R._multiDrawInstances!==null)hn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Xe.renderMultiDrawInstances(R._multiDrawStarts,R._multiDrawCounts,R._multiDrawCount,R._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))Xe.renderMultiDraw(R._multiDrawStarts,R._multiDrawCounts,R._multiDrawCount);else{const Me=R._multiDrawStarts,tt=R._multiDrawCounts,Oe=R._multiDrawCount,_t=le?o.get(le).bytesPerElement:1,Bt=Se.get(y).currentProgram.getUniforms();for(let gt=0;gt<Oe;gt++)Bt.setValue(m,"_gl_DrawID",gt),Xe.render(Me[gt]/_t,tt[gt])}else if(R.isInstancedMesh)Xe.renderInstances(Ie,it,R.count);else if(w.isInstancedBufferGeometry){const Me=w._maxInstanceCount!==void 0?w._maxInstanceCount:1/0,tt=Math.min(w.instanceCount,Me);Xe.renderInstances(Ie,it,tt)}else Xe.render(Ie,it)};function ke(l,A,w){l.transparent===!0&&l.side===Rt&&l.forceSinglePass===!1?(l.side=vt,l.needsUpdate=!0,ln(l,A,w),l.side=nn,l.needsUpdate=!0,ln(l,A,w),l.side=Rt):ln(l,A,w)}this.compile=function(l,A,w=null){w===null&&(w=l),r=ie.get(w),r.init(A),b.push(r),w.traverseVisible(function(R){R.isLight&&R.layers.test(A.layers)&&(r.pushLight(R),R.castShadow&&r.pushShadow(R))}),l!==w&&l.traverseVisible(function(R){R.isLight&&R.layers.test(A.layers)&&(r.pushLight(R),R.castShadow&&r.pushShadow(R))}),r.setupLights();const y=new Set;return l.traverse(function(R){if(!(R.isMesh||R.isPoints||R.isLine||R.isSprite))return;const j=R.material;if(j)if(Array.isArray(j))for(let ae=0;ae<j.length;ae++){const de=j[ae];ke(de,w,R),y.add(de)}else ke(j,w,R),y.add(j)}),r=b.pop(),y},this.compileAsync=function(l,A,w=null){const y=this.compile(l,A,w);return new Promise(R=>{function j(){if(y.forEach(function(ae){Se.get(ae).currentProgram.isReady()&&y.delete(ae)}),y.size===0){R(l);return}setTimeout(j,10)}Ge.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Mt=null;function xt(l){Mt&&Mt(l)}function ni(){Pt.stop()}function ii(){Pt.start()}const Pt=new Or;Pt.setAnimationLoop(xt),typeof self<"u"&&Pt.setContext(self),this.setAnimationLoop=function(l){Mt=l,Z.setAnimationLoop(l),l===null?Pt.stop():Pt.start()},Z.addEventListener("sessionstart",ni),Z.addEventListener("sessionend",ii),this.render=function(l,A){if(A!==void 0&&A.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;if(l.matrixWorldAutoUpdate===!0&&l.updateMatrixWorld(),A.parent===null&&A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(A),A=Z.getCamera()),l.isScene===!0&&l.onBeforeRender(v,l,A,H),r=ie.get(l,b.length),r.init(A),b.push(r),ge.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),k.setFromProjectionMatrix(ge),_e=this.localClippingEnabled,J=ue.init(this.clippingPlanes,_e),f=he.get(l,U.length),f.init(),U.push(f),Z.enabled===!0&&Z.isPresenting===!0){const j=v.xr.getDepthSensingMesh();j!==null&&Rn(j,A,-1/0,v.sortObjects)}Rn(l,A,0,v.sortObjects),f.finish(),v.sortObjects===!0&&f.sort(ve,Ae),et=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,et&&q.addToRenderList(f,l),this.info.render.frame++,J===!0&&ue.beginShadows();const w=r.state.shadowsArray;me.render(w,l,A),J===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const y=f.opaque,R=f.transmissive;if(r.setupLights(),A.isArrayCamera){const j=A.cameras;if(R.length>0)for(let ae=0,de=j.length;ae<de;ae++){const le=j[ae];ai(y,R,l,le)}et&&q.render(l);for(let ae=0,de=j.length;ae<de;ae++){const le=j[ae];ri(f,l,le,le.viewport)}}else R.length>0&&ai(y,R,l,A),et&&q.render(l),ri(f,l,A);H!==null&&I===0&&(Le.updateMultisampleRenderTarget(H),Le.updateRenderTargetMipmap(H)),l.isScene===!0&&l.onAfterRender(v,l,A),Pe.resetDefaultState(),h=-1,d=null,b.pop(),b.length>0?(r=b[b.length-1],J===!0&&ue.setGlobalState(v.clippingPlanes,r.state.camera)):r=null,U.pop(),U.length>0?f=U[U.length-1]:f=null};function Rn(l,A,w,y){if(l.visible===!1)return;if(l.layers.test(A.layers)){if(l.isGroup)w=l.renderOrder;else if(l.isLOD)l.autoUpdate===!0&&l.update(A);else if(l.isLight)r.pushLight(l),l.castShadow&&r.pushShadow(l);else if(l.isSprite){if(!l.frustumCulled||k.intersectsSprite(l)){y&&Re.setFromMatrixPosition(l.matrixWorld).applyMatrix4(ge);const ae=B.update(l),de=l.material;de.visible&&f.push(l,ae,de,w,Re.z,null)}}else if((l.isMesh||l.isLine||l.isPoints)&&(!l.frustumCulled||k.intersectsObject(l))){const ae=B.update(l),de=l.material;if(y&&(l.boundingSphere!==void 0?(l.boundingSphere===null&&l.computeBoundingSphere(),Re.copy(l.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),Re.copy(ae.boundingSphere.center)),Re.applyMatrix4(l.matrixWorld).applyMatrix4(ge)),Array.isArray(de)){const le=ae.groups;for(let be=0,Ce=le.length;be<Ce;be++){const Ee=le[be],Ie=de[Ee.materialIndex];Ie&&Ie.visible&&f.push(l,ae,Ie,w,Re.z,Ee)}}else de.visible&&f.push(l,ae,de,w,Re.z,null)}}const j=l.children;for(let ae=0,de=j.length;ae<de;ae++)Rn(j[ae],A,w,y)}function ri(l,A,w,y){const R=l.opaque,j=l.transmissive,ae=l.transparent;r.setupLightsView(w),J===!0&&ue.setGlobalState(v.clippingPlanes,w),y&&pe.viewport(C.copy(y)),R.length>0&&sn(R,A,w),j.length>0&&sn(j,A,w),ae.length>0&&sn(ae,A,w),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function ai(l,A,w,y){if((w.isScene===!0?w.overrideMaterial:null)!==null)return;r.state.transmissionRenderTarget[y.id]===void 0&&(r.state.transmissionRenderTarget[y.id]=new Kt(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?Mn:Ot,minFilter:Qt,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const j=r.state.transmissionRenderTarget[y.id],ae=y.viewport||C;j.setSize(ae.z*v.transmissionResolutionScale,ae.w*v.transmissionResolutionScale);const de=v.getRenderTarget(),le=v.getActiveCubeFace(),be=v.getActiveMipmapLevel();v.setRenderTarget(j),v.getClearColor(Y),Q=v.getClearAlpha(),Q<1&&v.setClearColor(16777215,.5),v.clear(),et&&q.render(w);const Ce=v.toneMapping;v.toneMapping=Ct;const Ee=y.viewport;if(y.viewport!==void 0&&(y.viewport=void 0),r.setupLightsView(y),J===!0&&ue.setGlobalState(v.clippingPlanes,y),sn(l,w,y),Le.updateMultisampleRenderTarget(j),Le.updateRenderTargetMipmap(j),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ze=0,it=A.length;ze<it;ze++){const qe=A[ze],Xe=qe.object,Me=qe.geometry,tt=qe.material,Oe=qe.group;if(tt.side===Rt&&Xe.layers.test(y.layers)){const _t=tt.side;tt.side=vt,tt.needsUpdate=!0,oi(Xe,w,y,Me,tt,Oe),tt.side=_t,tt.needsUpdate=!0,Ie=!0}}Ie===!0&&(Le.updateMultisampleRenderTarget(j),Le.updateRenderTargetMipmap(j))}v.setRenderTarget(de,le,be),v.setClearColor(Y,Q),Ee!==void 0&&(y.viewport=Ee),v.toneMapping=Ce}function sn(l,A,w){const y=A.isScene===!0?A.overrideMaterial:null;for(let R=0,j=l.length;R<j;R++){const ae=l[R],de=ae.object,le=ae.geometry,be=ae.group;let Ce=ae.material;Ce.allowOverride===!0&&y!==null&&(Ce=y),de.layers.test(w.layers)&&oi(de,A,w,le,Ce,be)}}function oi(l,A,w,y,R,j){l.onBeforeRender(v,A,w,y,R,j),l.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,l.matrixWorld),l.normalMatrix.getNormalMatrix(l.modelViewMatrix),R.onBeforeRender(v,A,w,y,l,j),R.transparent===!0&&R.side===Rt&&R.forceSinglePass===!1?(R.side=vt,R.needsUpdate=!0,v.renderBufferDirect(w,A,y,R,l,j),R.side=nn,R.needsUpdate=!0,v.renderBufferDirect(w,A,y,R,l,j),R.side=Rt):v.renderBufferDirect(w,A,y,R,l,j),l.onAfterRender(v,A,w,y,R,j)}function ln(l,A,w){A.isScene!==!0&&(A=Je);const y=Se.get(l),R=r.state.lights,j=r.state.shadowsArray,ae=R.state.version,de=X.getParameters(l,R.state,j,A,w),le=X.getProgramCacheKey(de);let be=y.programs;y.environment=l.isMeshStandardMaterial?A.environment:null,y.fog=A.fog,y.envMap=(l.isMeshStandardMaterial?p:at).get(l.envMap||y.environment),y.envMapRotation=y.environment!==null&&l.envMap===null?A.environmentRotation:l.envMapRotation,be===void 0&&(l.addEventListener("dispose",fe),be=new Map,y.programs=be);let Ce=be.get(le);if(Ce!==void 0){if(y.currentProgram===Ce&&y.lightsStateVersion===ae)return li(l,de),Ce}else de.uniforms=X.getUniforms(l),l.onBeforeCompile(de,v),Ce=X.acquireProgram(de,le),be.set(le,Ce),y.uniforms=de.uniforms;const Ee=y.uniforms;return(!l.isShaderMaterial&&!l.isRawShaderMaterial||l.clipping===!0)&&(Ee.clippingPlanes=ue.uniform),li(l,de),y.needsLights=Wr(l),y.lightsStateVersion=ae,y.needsLights&&(Ee.ambientLightColor.value=R.state.ambient,Ee.lightProbe.value=R.state.probe,Ee.directionalLights.value=R.state.directional,Ee.directionalLightShadows.value=R.state.directionalShadow,Ee.spotLights.value=R.state.spot,Ee.spotLightShadows.value=R.state.spotShadow,Ee.rectAreaLights.value=R.state.rectArea,Ee.ltc_1.value=R.state.rectAreaLTC1,Ee.ltc_2.value=R.state.rectAreaLTC2,Ee.pointLights.value=R.state.point,Ee.pointLightShadows.value=R.state.pointShadow,Ee.hemisphereLights.value=R.state.hemi,Ee.directionalShadowMap.value=R.state.directionalShadowMap,Ee.directionalShadowMatrix.value=R.state.directionalShadowMatrix,Ee.spotShadowMap.value=R.state.spotShadowMap,Ee.spotLightMatrix.value=R.state.spotLightMatrix,Ee.spotLightMap.value=R.state.spotLightMap,Ee.pointShadowMap.value=R.state.pointShadowMap,Ee.pointShadowMatrix.value=R.state.pointShadowMatrix),y.currentProgram=Ce,y.uniformsList=null,Ce}function si(l){if(l.uniformsList===null){const A=l.currentProgram.getUniforms();l.uniformsList=gn.seqWithValue(A.seq,l.uniforms)}return l.uniformsList}function li(l,A){const w=Se.get(l);w.outputColorSpace=A.outputColorSpace,w.batching=A.batching,w.batchingColor=A.batchingColor,w.instancing=A.instancing,w.instancingColor=A.instancingColor,w.instancingMorph=A.instancingMorph,w.skinning=A.skinning,w.morphTargets=A.morphTargets,w.morphNormals=A.morphNormals,w.morphColors=A.morphColors,w.morphTargetsCount=A.morphTargetsCount,w.numClippingPlanes=A.numClippingPlanes,w.numIntersection=A.numClipIntersection,w.vertexAlphas=A.vertexAlphas,w.vertexTangents=A.vertexTangents,w.toneMapping=A.toneMapping}function kr(l,A,w,y,R){A.isScene!==!0&&(A=Je),Le.resetTextureUnits();const j=A.fog,ae=y.isMeshStandardMaterial?A.environment:null,de=H===null?v.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Tn,le=(y.isMeshStandardMaterial?p:at).get(y.envMap||ae),be=y.vertexColors===!0&&!!w.attributes.color&&w.attributes.color.itemSize===4,Ce=!!w.attributes.tangent&&(!!y.normalMap||y.anisotropy>0),Ee=!!w.morphAttributes.position,Ie=!!w.morphAttributes.normal,ze=!!w.morphAttributes.color;let it=Ct;y.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(it=v.toneMapping);const qe=w.morphAttributes.position||w.morphAttributes.normal||w.morphAttributes.color,Xe=qe!==void 0?qe.length:0,Me=Se.get(y),tt=r.state.lights;if(J===!0&&(_e===!0||l!==d)){const ft=l===d&&y.id===h;ue.setState(y,l,ft)}let Oe=!1;y.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==tt.state.version||Me.outputColorSpace!==de||R.isBatchedMesh&&Me.batching===!1||!R.isBatchedMesh&&Me.batching===!0||R.isBatchedMesh&&Me.batchingColor===!0&&R.colorTexture===null||R.isBatchedMesh&&Me.batchingColor===!1&&R.colorTexture!==null||R.isInstancedMesh&&Me.instancing===!1||!R.isInstancedMesh&&Me.instancing===!0||R.isSkinnedMesh&&Me.skinning===!1||!R.isSkinnedMesh&&Me.skinning===!0||R.isInstancedMesh&&Me.instancingColor===!0&&R.instanceColor===null||R.isInstancedMesh&&Me.instancingColor===!1&&R.instanceColor!==null||R.isInstancedMesh&&Me.instancingMorph===!0&&R.morphTexture===null||R.isInstancedMesh&&Me.instancingMorph===!1&&R.morphTexture!==null||Me.envMap!==le||y.fog===!0&&Me.fog!==j||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==ue.numPlanes||Me.numIntersection!==ue.numIntersection)||Me.vertexAlphas!==be||Me.vertexTangents!==Ce||Me.morphTargets!==Ee||Me.morphNormals!==Ie||Me.morphColors!==ze||Me.toneMapping!==it||Me.morphTargetsCount!==Xe)&&(Oe=!0):(Oe=!0,Me.__version=y.version);let _t=Me.currentProgram;Oe===!0&&(_t=ln(y,A,R));let Bt=!1,gt=!1,$t=!1;const je=_t.getUniforms(),Et=Me.uniforms;if(pe.useProgram(_t.program)&&(Bt=!0,gt=!0,$t=!0),y.id!==h&&(h=y.id,gt=!0),Bt||d!==l){pe.buffers.depth.getReversed()?(oe.copy(l.projectionMatrix),jr(oe),Qr(oe),je.setValue(m,"projectionMatrix",oe)):je.setValue(m,"projectionMatrix",l.projectionMatrix),je.setValue(m,"viewMatrix",l.matrixWorldInverse);const ut=je.map.cameraPosition;ut!==void 0&&ut.setValue(m,Be.setFromMatrixPosition(l.matrixWorld)),Ye.logarithmicDepthBuffer&&je.setValue(m,"logDepthBufFC",2/(Math.log(l.far+1)/Math.LN2)),(y.isMeshPhongMaterial||y.isMeshToonMaterial||y.isMeshLambertMaterial||y.isMeshBasicMaterial||y.isMeshStandardMaterial||y.isShaderMaterial)&&je.setValue(m,"isOrthographic",l.isOrthographicCamera===!0),d!==l&&(d=l,gt=!0,$t=!0)}if(R.isSkinnedMesh){je.setOptional(m,R,"bindMatrix"),je.setOptional(m,R,"bindMatrixInverse");const ft=R.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),je.setValue(m,"boneTexture",ft.boneTexture,Le))}R.isBatchedMesh&&(je.setOptional(m,R,"batchingTexture"),je.setValue(m,"batchingTexture",R._matricesTexture,Le),je.setOptional(m,R,"batchingIdTexture"),je.setValue(m,"batchingIdTexture",R._indirectTexture,Le),je.setOptional(m,R,"batchingColorTexture"),R._colorsTexture!==null&&je.setValue(m,"batchingColorTexture",R._colorsTexture,Le));const St=w.morphAttributes;if((St.position!==void 0||St.normal!==void 0||St.color!==void 0)&&se.update(R,w,_t),(gt||Me.receiveShadow!==R.receiveShadow)&&(Me.receiveShadow=R.receiveShadow,je.setValue(m,"receiveShadow",R.receiveShadow)),y.isMeshGouraudMaterial&&y.envMap!==null&&(Et.envMap.value=le,Et.flipEnvMap.value=le.isCubeTexture&&le.isRenderTargetTexture===!1?-1:1),y.isMeshStandardMaterial&&y.envMap===null&&A.environment!==null&&(Et.envMapIntensity.value=A.environmentIntensity),gt&&(je.setValue(m,"toneMappingExposure",v.toneMappingExposure),Me.needsLights&&zr(Et,$t),j&&y.fog===!0&&O.refreshFogUniforms(Et,j),O.refreshMaterialUniforms(Et,y,F,ee,r.state.transmissionRenderTarget[l.id]),gn.upload(m,si(Me),Et,Le)),y.isShaderMaterial&&y.uniformsNeedUpdate===!0&&(gn.upload(m,si(Me),Et,Le),y.uniformsNeedUpdate=!1),y.isSpriteMaterial&&je.setValue(m,"center",R.center),je.setValue(m,"modelViewMatrix",R.modelViewMatrix),je.setValue(m,"normalMatrix",R.normalMatrix),je.setValue(m,"modelMatrix",R.matrixWorld),y.isShaderMaterial||y.isRawShaderMaterial){const ft=y.uniformsGroups;for(let ut=0,bn=ft.length;ut<bn;ut++){const Dt=ft[ut];S.update(Dt,_t),S.bind(Dt,_t)}}return _t}function zr(l,A){l.ambientLightColor.needsUpdate=A,l.lightProbe.needsUpdate=A,l.directionalLights.needsUpdate=A,l.directionalLightShadows.needsUpdate=A,l.pointLights.needsUpdate=A,l.pointLightShadows.needsUpdate=A,l.spotLights.needsUpdate=A,l.spotLightShadows.needsUpdate=A,l.rectAreaLights.needsUpdate=A,l.hemisphereLights.needsUpdate=A}function Wr(l){return l.isMeshLambertMaterial||l.isMeshToonMaterial||l.isMeshPhongMaterial||l.isMeshStandardMaterial||l.isShadowMaterial||l.isShaderMaterial&&l.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(l,A,w){const y=Se.get(l);y.__autoAllocateDepthBuffer=l.resolveDepthBuffer===!1,y.__autoAllocateDepthBuffer===!1&&(y.__useRenderToTexture=!1),Se.get(l.texture).__webglTexture=A,Se.get(l.depthTexture).__webglTexture=y.__autoAllocateDepthBuffer?void 0:w,y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(l,A){const w=Se.get(l);w.__webglFramebuffer=A,w.__useDefaultFramebuffer=A===void 0};const Xr=m.createFramebuffer();this.setRenderTarget=function(l,A=0,w=0){H=l,L=A,I=w;let y=!0,R=null,j=!1,ae=!1;if(l){const le=Se.get(l);if(le.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(m.FRAMEBUFFER,null),y=!1;else if(le.__webglFramebuffer===void 0)Le.setupRenderTarget(l);else if(le.__hasExternalTextures)Le.rebindTextures(l,Se.get(l.texture).__webglTexture,Se.get(l.depthTexture).__webglTexture);else if(l.depthBuffer){const Ee=l.depthTexture;if(le.__boundDepthTexture!==Ee){if(Ee!==null&&Se.has(Ee)&&(l.width!==Ee.image.width||l.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Le.setupDepthRenderbuffer(l)}}const be=l.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(ae=!0);const Ce=Se.get(l).__webglFramebuffer;l.isWebGLCubeRenderTarget?(Array.isArray(Ce[A])?R=Ce[A][w]:R=Ce[A],j=!0):l.samples>0&&Le.useMultisampledRTT(l)===!1?R=Se.get(l).__webglMultisampledFramebuffer:Array.isArray(Ce)?R=Ce[w]:R=Ce,C.copy(l.viewport),K.copy(l.scissor),V=l.scissorTest}else C.copy(we).multiplyScalar(F).floor(),K.copy(Ve).multiplyScalar(F).floor(),V=nt;if(w!==0&&(R=Xr),pe.bindFramebuffer(m.FRAMEBUFFER,R)&&y&&pe.drawBuffers(l,R),pe.viewport(C),pe.scissor(K),pe.setScissorTest(V),j){const le=Se.get(l.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_CUBE_MAP_POSITIVE_X+A,le.__webglTexture,w)}else if(ae){const le=Se.get(l.texture),be=A;m.framebufferTextureLayer(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,le.__webglTexture,w,be)}else if(l!==null&&w!==0){const le=Se.get(l.texture);m.framebufferTexture2D(m.FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,le.__webglTexture,w)}h=-1},this.readRenderTargetPixels=function(l,A,w,y,R,j,ae,de=0){if(!(l&&l.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let le=Se.get(l).__webglFramebuffer;if(l.isWebGLCubeRenderTarget&&ae!==void 0&&(le=le[ae]),le){pe.bindFramebuffer(m.FRAMEBUFFER,le);try{const be=l.textures[de],Ce=be.format,Ee=be.type;if(!Ye.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ye.textureTypeReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}A>=0&&A<=l.width-y&&w>=0&&w<=l.height-R&&(l.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+de),m.readPixels(A,w,y,R,te.convert(Ce),te.convert(Ee),j))}finally{const be=H!==null?Se.get(H).__webglFramebuffer:null;pe.bindFramebuffer(m.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(l,A,w,y,R,j,ae,de=0){if(!(l&&l.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let le=Se.get(l).__webglFramebuffer;if(l.isWebGLCubeRenderTarget&&ae!==void 0&&(le=le[ae]),le)if(A>=0&&A<=l.width-y&&w>=0&&w<=l.height-R){pe.bindFramebuffer(m.FRAMEBUFFER,le);const be=l.textures[de],Ce=be.format,Ee=be.type;if(!Ye.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ye.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=m.createBuffer();m.bindBuffer(m.PIXEL_PACK_BUFFER,Ie),m.bufferData(m.PIXEL_PACK_BUFFER,j.byteLength,m.STREAM_READ),l.textures.length>1&&m.readBuffer(m.COLOR_ATTACHMENT0+de),m.readPixels(A,w,y,R,te.convert(Ce),te.convert(Ee),0);const ze=H!==null?Se.get(H).__webglFramebuffer:null;pe.bindFramebuffer(m.FRAMEBUFFER,ze);const it=m.fenceSync(m.SYNC_GPU_COMMANDS_COMPLETE,0);return m.flush(),await Jr(m,it,4),m.bindBuffer(m.PIXEL_PACK_BUFFER,Ie),m.getBufferSubData(m.PIXEL_PACK_BUFFER,0,j),m.deleteBuffer(Ie),m.deleteSync(it),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(l,A=null,w=0){const y=Math.pow(2,-w),R=Math.floor(l.image.width*y),j=Math.floor(l.image.height*y),ae=A!==null?A.x:0,de=A!==null?A.y:0;Le.setTexture2D(l,0),m.copyTexSubImage2D(m.TEXTURE_2D,w,0,0,ae,de,R,j),pe.unbindTexture()};const Yr=m.createFramebuffer(),Kr=m.createFramebuffer();this.copyTextureToTexture=function(l,A,w=null,y=null,R=0,j=null){j===null&&(R!==0?(hn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=R,R=0):j=0);let ae,de,le,be,Ce,Ee,Ie,ze,it;const qe=l.isCompressedTexture?l.mipmaps[j]:l.image;if(w!==null)ae=w.max.x-w.min.x,de=w.max.y-w.min.y,le=w.isBox3?w.max.z-w.min.z:1,be=w.min.x,Ce=w.min.y,Ee=w.isBox3?w.min.z:0;else{const St=Math.pow(2,-R);ae=Math.floor(qe.width*St),de=Math.floor(qe.height*St),l.isDataArrayTexture?le=qe.depth:l.isData3DTexture?le=Math.floor(qe.depth*St):le=1,be=0,Ce=0,Ee=0}y!==null?(Ie=y.x,ze=y.y,it=y.z):(Ie=0,ze=0,it=0);const Xe=te.convert(A.format),Me=te.convert(A.type);let tt;A.isData3DTexture?(Le.setTexture3D(A,0),tt=m.TEXTURE_3D):A.isDataArrayTexture||A.isCompressedArrayTexture?(Le.setTexture2DArray(A,0),tt=m.TEXTURE_2D_ARRAY):(Le.setTexture2D(A,0),tt=m.TEXTURE_2D),m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,A.flipY),m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),m.pixelStorei(m.UNPACK_ALIGNMENT,A.unpackAlignment);const Oe=m.getParameter(m.UNPACK_ROW_LENGTH),_t=m.getParameter(m.UNPACK_IMAGE_HEIGHT),Bt=m.getParameter(m.UNPACK_SKIP_PIXELS),gt=m.getParameter(m.UNPACK_SKIP_ROWS),$t=m.getParameter(m.UNPACK_SKIP_IMAGES);m.pixelStorei(m.UNPACK_ROW_LENGTH,qe.width),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,qe.height),m.pixelStorei(m.UNPACK_SKIP_PIXELS,be),m.pixelStorei(m.UNPACK_SKIP_ROWS,Ce),m.pixelStorei(m.UNPACK_SKIP_IMAGES,Ee);const je=l.isDataArrayTexture||l.isData3DTexture,Et=A.isDataArrayTexture||A.isData3DTexture;if(l.isDepthTexture){const St=Se.get(l),ft=Se.get(A),ut=Se.get(St.__renderTarget),bn=Se.get(ft.__renderTarget);pe.bindFramebuffer(m.READ_FRAMEBUFFER,ut.__webglFramebuffer),pe.bindFramebuffer(m.DRAW_FRAMEBUFFER,bn.__webglFramebuffer);for(let Dt=0;Dt<le;Dt++)je&&(m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,Se.get(l).__webglTexture,R,Ee+Dt),m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,Se.get(A).__webglTexture,j,it+Dt)),m.blitFramebuffer(be,Ce,ae,de,Ie,ze,ae,de,m.DEPTH_BUFFER_BIT,m.NEAREST);pe.bindFramebuffer(m.READ_FRAMEBUFFER,null),pe.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else if(R!==0||l.isRenderTargetTexture||Se.has(l)){const St=Se.get(l),ft=Se.get(A);pe.bindFramebuffer(m.READ_FRAMEBUFFER,Yr),pe.bindFramebuffer(m.DRAW_FRAMEBUFFER,Kr);for(let ut=0;ut<le;ut++)je?m.framebufferTextureLayer(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,St.__webglTexture,R,Ee+ut):m.framebufferTexture2D(m.READ_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,St.__webglTexture,R),Et?m.framebufferTextureLayer(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,ft.__webglTexture,j,it+ut):m.framebufferTexture2D(m.DRAW_FRAMEBUFFER,m.COLOR_ATTACHMENT0,m.TEXTURE_2D,ft.__webglTexture,j),R!==0?m.blitFramebuffer(be,Ce,ae,de,Ie,ze,ae,de,m.COLOR_BUFFER_BIT,m.NEAREST):Et?m.copyTexSubImage3D(tt,j,Ie,ze,it+ut,be,Ce,ae,de):m.copyTexSubImage2D(tt,j,Ie,ze,be,Ce,ae,de);pe.bindFramebuffer(m.READ_FRAMEBUFFER,null),pe.bindFramebuffer(m.DRAW_FRAMEBUFFER,null)}else Et?l.isDataTexture||l.isData3DTexture?m.texSubImage3D(tt,j,Ie,ze,it,ae,de,le,Xe,Me,qe.data):A.isCompressedArrayTexture?m.compressedTexSubImage3D(tt,j,Ie,ze,it,ae,de,le,Xe,qe.data):m.texSubImage3D(tt,j,Ie,ze,it,ae,de,le,Xe,Me,qe):l.isDataTexture?m.texSubImage2D(m.TEXTURE_2D,j,Ie,ze,ae,de,Xe,Me,qe.data):l.isCompressedTexture?m.compressedTexSubImage2D(m.TEXTURE_2D,j,Ie,ze,qe.width,qe.height,Xe,qe.data):m.texSubImage2D(m.TEXTURE_2D,j,Ie,ze,ae,de,Xe,Me,qe);m.pixelStorei(m.UNPACK_ROW_LENGTH,Oe),m.pixelStorei(m.UNPACK_IMAGE_HEIGHT,_t),m.pixelStorei(m.UNPACK_SKIP_PIXELS,Bt),m.pixelStorei(m.UNPACK_SKIP_ROWS,gt),m.pixelStorei(m.UNPACK_SKIP_IMAGES,$t),j===0&&A.generateMipmaps&&m.generateMipmap(tt),pe.unbindTexture()},this.copyTextureToTexture3D=function(l,A,w=null,y=null,R=0){return hn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(l,A,w,y,R)},this.initRenderTarget=function(l){Se.get(l).__webglFramebuffer===void 0&&Le.setupRenderTarget(l)},this.initTexture=function(l){l.isCubeTexture?Le.setTextureCube(l,0):l.isData3DTexture?Le.setTexture3D(l,0):l.isDataArrayTexture||l.isCompressedArrayTexture?Le.setTexture2DArray(l,0):Le.setTexture2D(l,0),pe.unbindTexture()},this.resetState=function(){L=0,I=0,H=null,pe.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ea}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(n),t.unpackColorSpace=rt._getUnpackColorSpace()}}const mr={type:"change"},ti={type:"start"},Vr={type:"end"},pn=new Eo,_r=new Tr,sd=Math.cos(70*So.DEG2RAD),ot=new ye,pt=2*Math.PI,We={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gn=1e-6;class Td extends vo{constructor(n,t=null){super(n,t),this.state=We.NONE,this.target=new ye,this.cursor=new ye,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xt.ROTATE,MIDDLE:Xt.DOLLY,RIGHT:Xt.PAN},this.touches={ONE:zt.ROTATE,TWO:zt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new ye,this._lastQuaternion=new ki,this._lastTargetPosition=new ye,this._quat=new ki().setFromUnitVectors(n.up,new ye(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new zi,this._sphericalDelta=new zi,this._scale=1,this._panOffset=new ye,this._rotateStart=new $e,this._rotateEnd=new $e,this._rotateDelta=new $e,this._panStart=new $e,this._panEnd=new $e,this._panDelta=new $e,this._dollyStart=new $e,this._dollyEnd=new $e,this._dollyDelta=new $e,this._dollyDirection=new ye,this._mouse=new $e,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=cd.bind(this),this._onPointerDown=ld.bind(this),this._onPointerUp=fd.bind(this),this._onContextMenu=gd.bind(this),this._onMouseWheel=pd.bind(this),this._onKeyDown=hd.bind(this),this._onTouchStart=md.bind(this),this._onTouchMove=_d.bind(this),this._onMouseDown=dd.bind(this),this._onMouseMove=ud.bind(this),this._interceptControlDown=vd.bind(this),this._interceptControlUp=Ed.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(mr),this.update(),this.state=We.NONE}update(n=null){const t=this.object.position;ot.copy(t).sub(this.target),ot.applyQuaternion(this._quat),this._spherical.setFromVector3(ot),this.autoRotate&&this.state===We.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=pt:i>Math.PI&&(i-=pt),s<-Math.PI?s+=pt:s>Math.PI&&(s-=pt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const u=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=u!=this._spherical.radius}if(ot.setFromSpherical(this._spherical),ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let u=null;if(this.object.isPerspectiveCamera){const c=ot.length();u=this._clampDistance(c*this._scale);const x=c-u;this.object.position.addScaledVector(this._dollyDirection,x),this.object.updateMatrixWorld(),a=!!x}else if(this.object.isOrthographicCamera){const c=new ye(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const x=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=x!==this.object.zoom;const M=new ye(this._mouse.x,this._mouse.y,0);M.unproject(this.object),this.object.position.sub(M).add(c),this.object.updateMatrixWorld(),u=ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;u!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(u).add(this.object.position):(pn.origin.copy(this.object.position),pn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(pn.direction))<sd?this.object.lookAt(this.target):(_r.setFromNormalAndCoplanarPoint(this.object.up,this.target),pn.intersectPlane(_r,this.target))))}else if(this.object.isOrthographicCamera){const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),u!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Gn||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gn||this._lastTargetPosition.distanceToSquared(this.target)>Gn?(this.dispatchEvent(mr),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?pt/60*this.autoRotateSpeed*n:pt/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){ot.setFromMatrixColumn(t,0),ot.multiplyScalar(-n),this._panOffset.add(ot)}_panUp(n,t){this.screenSpacePanning===!0?ot.setFromMatrixColumn(t,1):(ot.setFromMatrixColumn(t,0),ot.crossVectors(this.object.up,ot)),ot.multiplyScalar(n),this._panOffset.add(ot)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ot.copy(s).sub(this.target);let a=ot.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*a/i.clientHeight,this.object.matrix),this._panUp(2*t*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=n-i.left,a=t-i.top,u=i.width,c=i.height;this._mouse.x=s/u*2-1,this._mouse.y=-(a/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(pt*this._rotateDelta.x/t.clientHeight),this._rotateUp(pt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,s=n.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),s=.5*(n.pageX+i.x),a=.5*(n.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(pt*this._rotateDelta.x/t.clientHeight),this._rotateUp(pt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,s=n.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const u=(n.pageX+t.x)*.5,c=(n.pageY+t.y)*.5;this._updateZoomParameters(u,c)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new $e,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function ld(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function cd(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function fd(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Vr),this.state=We.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function dd(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case Xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=We.DOLLY;break;case Xt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=We.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=We.ROTATE}break;case Xt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=We.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=We.PAN}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(ti)}function ud(e){switch(this.state){case We.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case We.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case We.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function pd(e){this.enabled===!1||this.enableZoom===!1||this.state!==We.NONE||(e.preventDefault(),this.dispatchEvent(ti),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Vr))}function hd(e){this.enabled!==!1&&this._handleKeyDown(e)}function md(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case zt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=We.TOUCH_ROTATE;break;case zt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=We.TOUCH_PAN;break;default:this.state=We.NONE}break;case 2:switch(this.touches.TWO){case zt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=We.TOUCH_DOLLY_PAN;break;case zt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=We.TOUCH_DOLLY_ROTATE;break;default:this.state=We.NONE}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(ti)}function _d(e){switch(this._trackPointer(e),this.state){case We.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case We.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case We.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case We.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=We.NONE}}function gd(e){this.enabled!==!1&&e.preventDefault()}function vd(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ed(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class xd extends Mo{constructor(){super();const n=new jn;n.deleteAttribute("uv");const t=new Wi({side:vt}),i=new Wi,s=new To(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const a=new dt(n,t);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);const u=new xo(n,i,6),c=new Ao;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),u.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),u.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),u.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),u.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),u.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),u.setMatrixAt(5,c.matrix),this.add(u);const x=new dt(n,Gt(50));x.position.set(-16.116,14.37,8.208),x.scale.set(.1,2.428,2.739),this.add(x);const M=new dt(n,Gt(50));M.position.set(-16.109,18.021,-8.207),M.scale.set(.1,2.425,2.751),this.add(M);const T=new dt(n,Gt(17));T.position.set(14.904,12.198,-1.832),T.scale.set(.15,4.265,6.331),this.add(T);const E=new dt(n,Gt(43));E.position.set(-.462,8.89,14.52),E.scale.set(4.38,5.441,.088),this.add(E);const g=new dt(n,Gt(20));g.position.set(3.235,11.486,-12.541),g.scale.set(2.5,2,.1),this.add(g);const _=new dt(n,Gt(100));_.position.set(0,20,0),_.scale.set(1,.1,1),this.add(_)}dispose(){const n=new Set;this.traverse(t=>{t.isMesh&&(n.add(t.geometry),n.add(t.material))});for(const t of n)t.dispose()}}function Gt(e){const n=new Er;return n.color.setScalar(e),n}function Ad(e,n=!1){const t=e[0].index!==null,i=new Set(Object.keys(e[0].attributes)),s=new Set(Object.keys(e[0].morphAttributes)),a={},u={},c=e[0].morphTargetsRelative,x=new Jn;let M=0;for(let T=0;T<e.length;++T){const E=e[T];let g=0;if(t!==(E.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const _ in E.attributes){if(!i.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+'. All geometries must have compatible attributes; make sure "'+_+'" attribute exists among all geometries, or in none of them.'),null;a[_]===void 0&&(a[_]=[]),a[_].push(E.attributes[_]),g++}if(g!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+". Make sure all geometries have the same number of attributes."),null;if(c!==E.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const _ in E.morphAttributes){if(!s.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+".  .morphAttributes must be consistent throughout all geometries."),null;u[_]===void 0&&(u[_]=[]),u[_].push(E.morphAttributes[_])}if(n){let _;if(t)_=E.index.count;else if(E.attributes.position!==void 0)_=E.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+T+". The geometry must have either an index or a position attribute"),null;x.addGroup(M,_,T),M+=_}}if(t){let T=0;const E=[];for(let g=0;g<e.length;++g){const _=e[g].index;for(let N=0;N<_.count;++N)E.push(_.getX(N)+T);T+=e[g].attributes.position.count}x.setIndex(E)}for(const T in a){const E=gr(a[T]);if(!E)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+T+" attribute."),null;x.setAttribute(T,E)}for(const T in u){const E=u[T][0].length;if(E===0)break;x.morphAttributes=x.morphAttributes||{},x.morphAttributes[T]=[];for(let g=0;g<E;++g){const _=[];for(let P=0;P<u[T].length;++P)_.push(u[T][P][g]);const N=gr(_);if(!N)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+T+" morphAttribute."),null;x.morphAttributes[T].push(N)}}return x}function gr(e){let n,t,i,s=-1,a=0;for(let M=0;M<e.length;++M){const T=e[M];if(n===void 0&&(n=T.array.constructor),n!==T.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=T.itemSize),t!==T.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=T.normalized),i!==T.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=T.gpuType),s!==T.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;a+=T.count*t}const u=new n(a),c=new en(u,t,i);let x=0;for(let M=0;M<e.length;++M){const T=e[M];if(T.isInterleavedBufferAttribute){const E=x/t;for(let g=0,_=T.count;g<_;g++)for(let N=0;N<t;N++){const P=T.getComponent(g,N);c.setComponent(g+E,N,P)}}else u.set(T.array,x);x+=T.count*t}return s!==void 0&&(c.gpuType=s),c}export{Td as O,qi as P,xd as R,Md as W,Ad as m};
