import { InternalServerErrorException } from "@nestjs/common";
import { MediaType } from "src/media/media.enums";

export class AppUtils {

    // CONVERTS
    public static parseStringToMediaType(mediaTypeString: string): MediaType {
        if (Object.values(MediaType).includes(mediaTypeString as MediaType)) 
            return mediaTypeString as MediaType;
    
        throw new InternalServerErrorException('Nao foi possivel converter string para ENUM.');
    };

    // TEXT VALIDATION
    public static isBlank(text: string): boolean {
        let isUndefinedOrNull: boolean = (text === undefined || text === null);
        let isEmpty: boolean = (text.trim() === '');
        return isUndefinedOrNull || isEmpty;
    };

    public static nonBlank(text: string): boolean {
        let isNonUndefinedOrNullAndNotIsEmpty: boolean = (text !== undefined && text !== null) && (text.trim() !== '');
        return isNonUndefinedOrNullAndNotIsEmpty;
    };

    public static isEqual(textOne: string, textTwo: string): boolean {
        let isEqual: boolean = (textOne.trim().toUpperCase() === textTwo.trim().toUpperCase());
        return isEqual;
    };

    public static nonEqual(textOne: string, textTwo: string): boolean {
        let nonEqual: boolean = (textOne.trim().toUpperCase() !== textTwo.trim().toUpperCase());
        return nonEqual;
    };

};