export const demos = [
	`
    const Demo = () => {
      const { slider, color } = useDebugPanel({
        slider: makeSlider({value: 10, max: 20, min: 5, step: 5}),
        color: makeColor('#FF0000')
      });

      return (
        <div>
          <div>Slider value: {slider.value}</div>
          <div>Slider min: {slider.min}</div>
          <div>Slider max: {slider.max}</div>
          <div>Slider step: {slider.step}</div>

          <div style={{
              position: 'relative',
              left: slider.value * 20 + 'px',
              backgroundColor: color.value,
              width: 100,
              height: 100
            }} />
        </div>
      );
    }

    render(<Demo />);
  `,
	`
    const Demo = () => {
      const { string, slider, color } = useDebugPanel({
          number: 1,
          string: 'text',
          boolean: true,
          date: new Date(),
          slider: makeSlider(10),
          color: makeColor('#00aaff'),
          array: [1, 2, 4, 5],
          object: {},
          undefined: undefined,
          null: null,
        },
        'Optional Title'
      );

      return (
        <div style={{backgroundColor: color.value}}>
          <div>{string}</div>
          <div>{slider.value}</div>
          <div>{color.value}</div>
        </div>
      );
    }

    render(<Demo />);
  `,
];
