"use strict";

const TEXT_SIZES = {
    title:  32,
    big:    17,
    normal: 15,
    small:  13,
    tiny:   10,
};

const FONT_WEIGHT = {
    light:      '100',
    semilight:  '200',
    regular:    '400',
    semibold:   '600',
    bold:       '700',
    black:      '900',
};

module.exports = {
    ...TEXT_SIZES,
    ...FONT_WEIGHT,
};