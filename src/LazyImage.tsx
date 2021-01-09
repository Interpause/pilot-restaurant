/**
 * @file better than the one provided by nextjs
 * @author John-Henry Lim <hyphen@interpause.dev>
 */

import { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useRef } from "react";

export interface LazyImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
	href?:string;
	/** "width height" */
	aspectRatio:string;
	src:string;
}

export function LazyImage({src,aspectRatio,...props}:LazyImageProps){
	const imgRef = useRef<HTMLImageElement>(null);
	useEffect(() => {
		setTimeout(()=>imgRef.current?.setAttribute("src",src),100);
	},[src])
	return <img ref={imgRef} loading="lazy" src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${aspectRatio}'%3E%3C/svg%3E`} {...props}/>;
}