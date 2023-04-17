export const GetBase64Img = (photo) =>  {
    return `data:image/${photo.type};base64,${photo.base64PhotoData}`;
}