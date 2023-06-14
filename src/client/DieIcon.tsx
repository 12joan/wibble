import React, { useMemo } from 'react';
import { TDie } from '../core/dice/types';
import { useD100Values } from './useD100Values';

type DieSVGProps = React.SVGProps<SVGSVGElement>;

const DieSVG = ({ children, ...props }: DieSVGProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      width="2em"
      height="2em"
      {...props}
      children={children}
    />
  );
};

export interface SpecificDieIconProps extends DieSVGProps {
  value: number;
  pathClassName?: string;
  valueClassName?: string;
}

const commonLabelProps: React.SVGProps<SVGTextElement> = {
  textAnchor: 'middle',
  fontSize: 10,
};

const D4 = ({
  value,
  pathClassName,
  valueClassName,
  ...props
}: SpecificDieIconProps) => {
  return (
    <DieSVG {...props}>
      <path
        d="M 9.8728 0.6068 C 10.1674 0.613699 10.041101 0.610699 10.2515 0.615601 C 10.8986 0.722599 11.3888 1.049999 11.7317 1.600201 L 19.732201 15.4612 C 20.501801 16.7945 19.539501 18.461 18 18.461 L 2 18.461 C 0.4606 18.461 -0.5017 16.7946 0.2678 15.461301 L 8.2673 1.6003 C 8.5848 1.0616 9.1198 0.6945 9.7474 0.615601 L 9.8728 0.6068 Z"
        className={pathClassName}
      />

      <text
        {...commonLabelProps}
        x={10}
        y={15}
        className={valueClassName}
        children={value}
      />
    </DieSVG>
  );
};

const D6 = ({
  value,
  pathClassName,
  valueClassName,
  ...props
}: SpecificDieIconProps) => {
  return (
    <DieSVG {...props}>
      <path
        d="M 17.333332 0 C 18.806131 0 20 1.193869 20 2.666668 L 20 17.333334 C 20 18.806135 18.806131 20 17.333332 20 L 2.666666 20 C 1.193867 20 0 18.806135 0 17.333334 L 0 2.666668 C 0 1.193869 1.193867 0 2.666666 0 L 17.333332 0 Z"
        className={pathClassName}
      />

      <text
        {...commonLabelProps}
        x={10}
        y={14}
        className={valueClassName}
        children={value}
      />
    </DieSVG>
  );
};

const D8 = ({
  value,
  pathClassName,
  valueClassName,
  ...props
}: SpecificDieIconProps) => {
  return (
    <DieSVG {...props}>
      <path
        d="M 9.9993 0.004601 L 10.1912 0.0091 C 10.668 0.056 11.0639 0.2696 11.4138 0.5858 L 19.4142 8.5858 C 20.195301 9.3668 20.195301 10.6332 19.4142 11.4142 L 11.4138 19.4142 C 10.6327 20.195301 9.3664 20.1952 8.5854 19.4142 L 0.5857 11.4142 C -0.1953 10.633101 -0.1953 9.366899 0.5858 8.5858 L 8.5854 0.5858 C 8.9175 0.2617 9.343699 0.053799 9.8078 0.009199 L 9.9993 0.004601 Z"
        className={pathClassName}
      />

      <text
        {...commonLabelProps}
        x={10}
        y={14}
        className={valueClassName}
        children={value}
      />
    </DieSVG>
  );
};

const D10 = ({
  value,
  pathClassName,
  valueClassName,
  ...props
}: SpecificDieIconProps) => {
  return (
    <DieSVG {...props}>
      <path
        d="M 5.959 3.5968 C 6.2132 3.5868 6.4568 3.6429 6.6959 3.721401 L 18.695799 8.1744 C 20.4347 8.8197 20.434801 11.2791 18.6959 11.9245 L 6.696 16.3785 C 5.9265 16.664101 5.0606 16.4506 4.5121 15.8398 L 0.512 11.3859 C -0.1707 10.6257 -0.1707 9.473101 0.5121 8.712999 L 4.5122 4.26 C 4.9177 3.813099 5.3743 3.6523 5.959 3.596899 Z"
        className={pathClassName}
      />

      <text
        {...commonLabelProps}
        x={7}
        y={13}
        fontSize={8}
        className={valueClassName}
        children={value}
      />
    </DieSVG>
  );
};

const D12 = ({
  value,
  pathClassName,
  valueClassName,
  ...props
}: SpecificDieIconProps) => {
  return (
    <DieSVG {...props}>
      <path
        d="M 12.471399 0.3925 C 12.893499 0.3925 13.3048 0.5261 13.6464 0.774 L 17.6479 3.679001 C 17.989901 3.927401 18.244501 4.2777 18.375101 4.6797 L 19.902201 9.381701 C 20.0326 9.7832 20.0326 10.2157 19.902201 10.6172 L 18.375101 15.3202 C 18.2446 15.722301 17.99 16.072599 17.6479 16.321001 L 13.6464 19.226 C 13.3048 19.474001 12.893499 19.6075 12.471399 19.6075 L 7.5286 19.6075 C 7.1065 19.6075 6.6952 19.474001 6.3536 19.226 L 2.3521 16.321001 C 2.01 16.072599 1.7554 15.722301 1.6249 15.3202 L 0.0978 10.6172 C -0.0326 10.2157 -0.0326 9.7832 0.0978 9.381701 L 1.6249 4.6797 C 1.7555 4.2777 2.0101 3.927401 2.3521 3.679001 L 6.3536 0.774 C 6.6952 0.5261 7.1065 0.3925 7.5286 0.3925 L 12.471399 0.3925 Z"
        className={pathClassName}
      />

      <text
        {...commonLabelProps}
        x={10}
        y={14}
        className={valueClassName}
        children={value}
      />
    </DieSVG>
  );
};

const D20 = ({
  value,
  pathClassName,
  valueClassName,
  ...props
}: SpecificDieIconProps) => {
  return (
    <DieSVG {...props}>
      <path
        d="M 10.0673 0.007999 L 10.2579 0.008701 C 10.846601 0.1653 10.6054 0.066 10.9993 0.259701 L 17.926701 4.2577 C 18.5457 4.615 18.927 5.275299 18.927 5.99 L 18.927 13.994 C 18.927 14.7086 18.5457 15.369 17.926701 15.726199 L 10.9993 19.724201 C 10.3806 20.0812 9.6185 20.0812 8.9998 19.7241 L 2.0732 15.7261 C 1.4543 15.368899 1.073 14.7086 1.073 13.994 L 1.073 5.99 C 1.073 5.2754 1.4543 4.615 2.0732 4.2578 L 8.9998 0.2598 C 9.3759 0.037601 9.6375 0.016901 10.0673 0.007999 Z"
        className={pathClassName}
      />

      <text
        {...commonLabelProps}
        x={10}
        y={14}
        className={valueClassName}
        children={value}
      />
    </DieSVG>
  );
};

const D100 = ({
  value,
  pathClassName,
  valueClassName,
  ...props
}: SpecificDieIconProps) => {
  const [value1, value2] = useD100Values(value);

  return (
    <DieSVG {...props}>
      <path
        d="M 14.9683 8.795401 C 15.5351 8.8134 16.0243 9.0554 16.4151 9.4586 L 19.324299 12.697599 C 20.007099 13.4577 20.007099 14.6103 19.324299 15.370399 L 16.4151 18.6094 C 15.866701 19.2201 15.000799 19.433599 14.2313 19.147999 L 5.5041 15.908999 C 3.7653 15.2637 3.7653 12.8043 5.5041 12.158999 L 14.2313 8.92 C 14.467 8.8214 14.7174 8.8088 14.9683 8.795401 Z"
        className={pathClassName}
      />

      <path
        d="M 5.068 0.7953 C 5.3222 0.785299 5.5659 0.8414 5.805 0.92 L 14.5323 4.158999 C 16.271099 4.8043 16.271099 7.2637 14.5323 7.908999 L 5.805 11.148001 C 5.0355 11.433599 4.1696 11.220099 3.6211 10.6094 L 0.712 7.3704 C 0.0293 6.6103 0.0293 5.4577 0.712 4.697599 L 3.6211 1.458599 C 4.0266 1.0116 4.4833 0.8508 5.068 0.795399 Z"
        className={pathClassName}
      />

      <text
        {...commonLabelProps}
        x={7}
        y={8.5}
        fontSize={6}
        className={valueClassName}
        children={value1}
      />

      <text
        {...commonLabelProps}
        x="14"
        y="16.5"
        fontSize={6}
        className={valueClassName}
        children={value2}
      />
    </DieSVG>
  );
};

export interface DieIconProps extends SpecificDieIconProps {
  die: TDie;
}

export const DieIcon = ({ die, ...props }: DieIconProps) => {
  const Component = useMemo(
    () =>
      ({
        4: D4,
        6: D6,
        8: D8,
        10: D10,
        12: D12,
        20: D20,
        '20A': D20,
        '20D': D20,
        100: D100,
      }[die] || D20),
    [die]
  );

  return <Component aria-label={`d${die}`} {...props} />;
};
