

export type MapType =         'line' | 'snake';
export type MapOrientation =  'horz' | 'vert';
export type MapFlip =         'none' | 'even' | 'odd';
export type MapStart =        'tl' | 'tr' | 'bl' | 'br';

export interface MappingParams {
    mapType: MapType;
    mapOrientation: MapOrientation;
    mapFlip?: MapFlip;
    mapStart: MapStart;
}

export class MappingGenerator {

    constructor(protected moduleMappingParams: MappingParams) { }

    // TODO: implement rotation of frames
    async generateMapping(frameWidth: number, frameHeight: number): Promise<number[]> { 
        const snake = this.moduleMappingParams.mapType == 'snake';
        const vertical = this.moduleMappingParams.mapOrientation == 'vert';
        const startingLeft = this.moduleMappingParams.mapStart == 'tl' || this.moduleMappingParams.mapStart == 'bl';
        const startingTop = this.moduleMappingParams.mapStart == 'tl' || this.moduleMappingParams.mapStart == 'tr';

        // ‧͙⁺˚* Magic, do not touch! *˚⁺‧͙
        
        // for vertical orientation, invert the meaning of X and Y
        const width = vertical ? frameHeight : frameWidth;
        const height = vertical ? frameWidth : frameHeight;

        let mapping = [];
        for (let i = 0; i < width * height; i++) {
            let x: number, y: number;

            // for vertical orientation, invert the meaning of X and Y
            let flipX = vertical ? !startingTop : !startingLeft;
            let flipY = vertical ? !startingLeft : !startingTop;

            if (!flipY)
                y = Math.floor(i / width);
            else
                y = height - Math.floor(i / width) - 1;

            // implement snake by flipping x depending on which y we're on
            if (snake) {
                const flipOnEvenLine = flipY && (height % 2 == 0); // normally flip on odd lines, except when starting from bottom and height is even (flipY is said start flag, horz/vert corrected)
                if (y % 2 == (flipOnEvenLine ? 0 : 1)) {     
                    flipX = !flipX;
                }
            }
            
            if (!flipX)
                x = Math.floor(i % width);
            else
                x = width - (i % width) - 1;
                
            let newPos: number;
            // for vertical orientation, invert the meaning of X and Y
            if (!vertical)
                newPos = y * width + x;
            else
                newPos = x * height + y;

            mapping[newPos] = i;
        }
        return mapping;
    }
}