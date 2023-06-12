import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

export interface DieSVGProps extends React.SVGProps<SVGSVGElement> {
  polygonSides: number;
  rotation?: number;
  borderRadius?: number;
  padding?: number;
  label: string;
  fontSize?: number;
  polygonProps?: React.SVGProps<SVGPolygonElement>;
  labelProps?: React.SVGProps<SVGTextElement>;
}

export const DieSVG = ({
  polygonSides,
  rotation = 0,
  borderRadius = 0.2,
  padding = 0.05,
  label,
  fontSize = 0.5,
  polygonProps,
  labelProps,
  ...svgProps
}: DieSVGProps) => {
  const viewBox = useMemo(
    () =>
      [
        -borderRadius / 2 - padding,
        -borderRadius / 2 - padding,
        1 + borderRadius + padding * 2,
        1 + borderRadius + padding * 2,
      ].join(' '),
    [borderRadius, padding]
  );

  const polygonPoints = useMemo(
    () =>
      Array.from({ length: polygonSides }, (_, index) => {
        const angle = (index / polygonSides + rotation / 360) * 2 * Math.PI;
        const x = (1 + Math.cos(angle)) / 2;
        const y = (1 + Math.sin(angle)) / 2;

        return `${x},${y}`;
      }).join(' '),
    [polygonSides, rotation]
  );

  return (
    <svg viewBox={viewBox} {...svgProps}>
      <polygon
        points={polygonPoints}
        strokeWidth={borderRadius}
        strokeLinejoin="round"
        {...polygonProps}
      />

      <text
        x="0.5"
        y="0.5625"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize}
        {...labelProps}
        children={label}
      />
    </svg>
  );
};

const makeDieVariant =
  ({
    className: baseClassName,
    polygonClassName: basePolygonClassName,
    labelClassName: baseLabelClassName,
    ...baseProps
  }: Partial<DieSVGProps> & {
    className?: string;
    polygonClassName?: string;
    labelClassName?: string;
  }) =>
  ({
    className: classNameProp,
    polygonProps: { className: polygonClassNameProp, ...polygonProps } = {},
    labelProps: { className: labelClassNameProp, ...labelProps } = {},
    ...props
  }: DieSVGProps) => {
    const className = twMerge(baseClassName, classNameProp);

    const polygonClassName = twMerge(
      basePolygonClassName,
      polygonClassNameProp
    );

    const labelClassName = twMerge(baseLabelClassName, labelClassNameProp);

    return (
      <DieSVG
        className={className}
        polygonProps={{
          className: polygonClassName,
          ...polygonProps,
        }}
        labelProps={{
          className: labelClassName,
          ...labelProps,
        }}
        {...baseProps}
        {...props}
      />
    );
  };

export const DieValueSVG = makeDieVariant({
  className: 'w-8 h-8',
  polygonClassName: 'fill-current stroke-current text-black dark:text-white',
  labelClassName: 'fill-current text-white dark:text-black',
});

export const DieButtonSVG = makeDieVariant({
  className:
    'w-12 h-12 text-transparent hover:text-slate-100 dark:hover:text-slate-800 transition-colors',
  polygonClassName: 'stroke-black dark:stroke-white fill-current',
  labelClassName: 'stroke-none fill-black dark:fill-white',
  borderRadius: 0.04,
  fontSize: 0.35,
});
