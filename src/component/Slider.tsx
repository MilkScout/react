/* eslint-disable react/destructuring-assignment */
import React, { Component, createRef, CSSProperties, PointerEvent, ReactElement } from 'react';
import { SLIDER } from '../variables';

const style: { [name: string]: CSSProperties } = {
  slider: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  sliderInner: {
    height: '100%',
  },

  sliderSlides: {
    height: '100%',
    display: 'flex',
  },

  sliderSlide: {
    flexBasis: 0,
    flexGrow: 1,
  },
};

const toRange = (value: number, range: number) => ((value % range) + range) % range;

interface SliderProps {
  slides: Array<ReactElement>;
  position?: number;
  onPosition?: { (position: number): void };
  preloadBack?: number;
  preloadForward?: number;
  velocityTracking?: number;
}

interface SliderState {
  position: number;
  destination: number;
  dragStart: number;
  dragStartTime: number | null;
  dragVelocity: number;
}

export class Slider extends Component<SliderProps, SliderState> {
  private ref = createRef<HTMLDivElement>();

  private scheduled: any;

  private index: number;

  constructor(props: SliderProps) {
    super(props);

    this.state = {
      position: props.position || 0,
      destination: 0,
      dragStart: 0,
      dragStartTime: null,
      dragVelocity: 0,
    };

    this.index = -1;
  }

  private getWidth() {
    return this.ref.current?.offsetWidth || 0;
  }

  private animate = () => {
    if (this.scheduled) {
      return;
    }

    this.scheduled = requestAnimationFrame(() => {
      this.scheduled = false;

      const distance = this.state.destination - this.state.position;

      if (Math.abs(distance * this.getWidth()) > 1) {
        const motion = 0.12 * distance;

        this.setState((state) => ({ position: state.position + motion }), this.animate);
      } else {
        this.skipTo(this.state.destination);
      }
    });
  };

  private onPointerDown = (event: PointerEvent) => {
    this.setState((state) => ({
      destination: state.position,
      dragStart: event.pageX,
      dragStartTime: Date.now(),
      dragVelocity: 0,
    }));
  };

  private onPointerMove = (event: PointerEvent) => {
    if (this.state.dragStartTime === null) {
      return;
    }
    const velocityTracking = this.props.velocityTracking || SLIDER.velocityTracking;
    this.setState((state) => {
      const dragTo = event.pageX;
      const distance = state.dragStart - dragTo;
      const unitDistance = distance / this.getWidth();
      const position = toRange(state.position + unitDistance, this.props.slides.length);
      const now = Date.now();
      const elapsed = now - (state.dragStartTime || 0);

      return {
        position,
        destination: position,
        dragStart: dragTo,
        dragStartTime: now,
        dragVelocity: (distance / elapsed) * velocityTracking * -1000 + (1 - velocityTracking) * state.dragVelocity,
      };
    });
  };

  private onPointerUp = () => {
    const dragging = Date.now() - (this.state.dragStartTime || 0) < 50;

    if (dragging && Math.abs(this.state.dragVelocity) > 200) {
      const direction = this.state.dragVelocity > 0 ? -1 : 1;

      this.slideTo(Math.round(this.state.destination + direction));
    } else {
      this.slideTo(Math.round(this.state.destination));
    }
  };

  slide(direction: number) {
    this.slideTo(Math.round(this.state.destination) + direction);
  }

  slideTo(destination: number) {
    this.setState({ destination, dragStartTime: null }, this.animate);
  }

  skip(direction: number) {
    this.skipTo(Math.round(this.state.position) + direction);
  }

  nextSlide() {
    this.slide(+1);
  }

  prevSlide() {
    this.slide(-1);
  }

  skipTo(position: number) {
    const destination = toRange(position, this.props.slides.length);

    this.setState({
      destination,
      position: destination,
    });
  }

  render() {
    const { length } = this.props.slides;
    const position = toRange(this.state.position, length);
    const index = Math.round(position);
    const offset = index - position;

    if (index !== this.index) {
      this.index = index;

      if (this.props.onPosition) {
        this.props.onPosition(toRange(this.index, length));
      }
    }

    const visible: Array<number> = [];
    const preloadBack = this.props.preloadBack || SLIDER.preloadBack;
    const preloadForward = this.props.preloadForward || SLIDER.preloadForward;

    for (let i = index - preloadBack; i <= index + preloadForward; i++) {
      visible.push((i + length) % length);
    }

    const slides = visible.map((i) => (
      <div key={i} style={style.sliderSlide}>
        {this.props.slides[i]}
      </div>
    ));

    const slidesStyle = {
      ...style.sliderSlides,
      width: `${100 * slides.length}%`,
      transform: `translateX(${(offset - preloadBack) * (100 / slides.length)}%)`,
    };

    return (
      <div style={style.slider} ref={this.ref}>
        <div
          style={style.sliderInner}
          onPointerDown={this.onPointerDown}
          onPointerMove={this.onPointerMove}
          onPointerUp={this.onPointerUp}
        >
          <div style={slidesStyle}>{slides}</div>
        </div>
      </div>
    );
  }
}
