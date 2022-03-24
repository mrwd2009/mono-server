import { FC, memo, useRef, useState, useEffect, CSSProperties, ReactNode, RefObject } from 'react';
import debounce from 'lodash/debounce';
import isFunction from 'lodash/isFunction';
import ResizeObserver from 'rc-resize-observer';

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ((props: { ref: RefObject<HTMLElement>; onScroll: () => void }) => ReactNode);
}

const ScrollShadow: FC<Props> = ({ className = '', style, children }) => {
  const contentRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  // avoid call calculation too frequently
  const updateShadowRef = useRef(
    debounce(
      () => {
        const {
          scrollHeight = 0,
          offsetHeight = 0,
          scrollWidth = 0,
          offsetWidth = 0,
          scrollLeft = 0,
          scrollTop = 0,
        } = (contentRef.current || {}) as any;
        if (scrollTop + offsetHeight < scrollHeight) {
          setShowBottom(true);
        } else {
          setShowBottom(false);
        }
        if (scrollTop > 0) {
          setShowTop(true);
        } else {
          setShowTop(false);
        }
        if (scrollLeft + offsetWidth < scrollWidth) {
          setShowRight(true);
        } else {
          setShowRight(false);
        }
        if (scrollLeft > 0) {
          setShowLeft(true);
        } else {
          setShowLeft(false);
        }
      },
      200,
      { leading: true },
    ),
  );
  useEffect(() => {
    const updateFunc = updateShadowRef.current;
    updateFunc();
    return () => {
      updateFunc.cancel();
    };
  }, []);

  const contentProps: any = {};
  let content: any = null;
  if (isFunction(children)) {
    content = children({ ref: contentRef, onScroll: updateShadowRef.current });
  } else {
    contentProps.ref = contentRef;
    contentProps.onScroll = updateShadowRef.current;
    content = children;
  }

  return (
    <ResizeObserver onResize={updateShadowRef.current}>
      <div
        className="scroll-shadow-container"
        style={style}
      >
        <div
          className={`scroll-shadow-content ${className}`}
          style={style}
          {...contentProps}
        >
          {content}
        </div>
        <div className={`top ${showTop ? 'shadow' : ''}`} />
        <div className={`bottom ${showBottom ? 'shadow' : ''}`} />
        <div className={`left ${showLeft ? 'shadow' : ''}`} />
        <div className={`right ${showRight ? 'shadow' : ''}`} />
      </div>
    </ResizeObserver>
  );
};

export default memo(ScrollShadow);
