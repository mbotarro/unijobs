// Sempre definir cores nesse arquivo e usá-las nos outros componentes do app
"use strict";

/* BASE COLOR PALETTE */
const UNIJOBS_COLORS = {
    main: '#008B8B',
    dark: '#50514F',
    dark_grey: '#65737E',
    light_grey: '#CBD4C2',
    light: '#FFFCFF',
};

const BASIC_COLORS = {
    white: 'white',
    black: 'black',
};

const ELEMENTS_COLORS = {
    background: '#FFFFFF',

    button: UNIJOBS_COLORS.main,
    text: 'black',

    title: UNIJOBS_COLORS.dark,
    subtitle: UNIJOBS_COLORS.dark_grey,
};

module.exports = {
    ...UNIJOBS_COLORS,
    ...BASIC_COLORS,
    ...ELEMENTS_COLORS,
};