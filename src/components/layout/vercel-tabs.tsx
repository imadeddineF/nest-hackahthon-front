"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import {
	Tabs as BaseTabs,
	TabsList as BaseTabsList,
	TabsTrigger as BaseTabsTrigger,
	TabsContent as BaseTabsContent,
} from "@/components/ui/tabs";
import {
	TabsProps,
	TabsListProps,
	TabsTriggerProps,
	TabsContentProps,
} from "@radix-ui/react-tabs";

export function Tabs({
	defaultValue,
	className,
	children,
	...props
}: TabsProps & { children: ReactNode }) {
	return (
		<BaseTabs defaultValue={defaultValue} className={className} {...props}>
			{children}
		</BaseTabs>
	);
}

export function TabsList({
	className,
	children,
	...props
}: TabsListProps & { children: ReactNode }) {
	const [indicatorStyle, setIndicatorStyle] = useState({});
	const tabsListRef = useRef<HTMLDivElement>(null);
	const activeTabRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		if (activeTabRef.current && tabsListRef.current) {
			const tabRect = activeTabRef.current.getBoundingClientRect();
			const listRect = tabsListRef.current.getBoundingClientRect();

			setIndicatorStyle({
				transform: `translateX(${tabRect.left - listRect.left}px)`,
				width: `${tabRect.width}px`,
			});
		}
	}, []);

	return (
		<div ref={tabsListRef} className="tabs-list">
			<BaseTabsList className={className} {...props}>
				{children}
			</BaseTabsList>
			<div className="tabs-indicator" style={indicatorStyle} />
		</div>
	);
}

export function TabsTrigger({
	value,
	className,
	children,
	...props
}: TabsTriggerProps & { children: ReactNode }) {
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<BaseTabsTrigger
			ref={triggerRef}
			value={value}
			className={className}
			onMouseDown={() => {
				if (!triggerRef.current) return;

				// Find parent tabs-list
				let parent = triggerRef.current.parentElement;
				while (parent && !parent.classList.contains("tabs-list")) {
					parent = parent.parentElement;
				}

				if (parent) {
					const tabRect = triggerRef.current.getBoundingClientRect();
					const listRect = parent.getBoundingClientRect();
					const indicator = parent.querySelector(".tabs-indicator");

					if (indicator && indicator instanceof HTMLElement) {
						indicator.style.transform = `translateX(${
							tabRect.left - listRect.left
						}px)`;
						indicator.style.width = `${tabRect.width}px`;
					}
				}
			}}
			{...props}
		>
			{children}
		</BaseTabsTrigger>
	);
}

export function TabsContent({
	value,
	className,
	children,
	...props
}: TabsContentProps & { children: ReactNode }) {
	return (
		<BaseTabsContent
			value={value}
			className={`tab-content-animate ${className || ""}`}
			{...props}
		>
			{children}
		</BaseTabsContent>
	);
}
