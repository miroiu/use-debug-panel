export const demos = [
	`
  /* NOTICE
    Code is editable
  */

  const Demo = () => {
    const { slider, color } = useDebugPanel({
      slider: makeSlider({value: 10, max: 20, min: 5, step: 5}),
      color: makeColor('#FF0000')
    }, {
      title: 'Optional Title',
      position: { x: 50, y: 400 }
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
  /* NOTICE
    Code is editable
  */

  const Demo = () => {
    const { number, boolean, date, array, string, slider, color } = useDebugPanel({
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
      }
    );

    return (
      <div style={{backgroundColor: color.value, fontSize: '1.2rem', fontWeight: 'bold', padding: 10}}>
        <div>Number: {number}</div>
        <div>String: {string}</div>
        <div>Boolean: {boolean.toString()}</div>
        <div>Date: {date.toISOString()}</div>
        <div>Slider: {slider.value}</div>
        <div>Color: {color.value}</div>
        <div>Array: {array.toString()}</div>
      </div>
    );
  }

  render(<Demo />);
  `,
];
