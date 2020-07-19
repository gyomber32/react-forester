export const resizeImage = (picture: File) => {
    const reader = new FileReader();
    const image = new Image();
    const canvas = document.createElement('canvas');
    const dataURItoBlob = (dataURI: string) => {
        const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            unescape(dataURI.split(',')[1]);
        const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const max = bytes.length;
        const ia = new Uint8Array(max);
        for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };
    const resize = () => {
        let width = image.width;
        let height = image.height;

        if (width > height) {
            if (width > 768) {
                height *= 768 / width;
                width = 768;
            }
        } else {
            if (height > 1024) {
                width *= 1024 / height;
                height = 1024;
            }
        }

        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);
        let dataUrl = canvas.toDataURL('image/jpeg');
        const blob = dataURItoBlob(dataUrl);
        const file: any = blob;
        file.lastModifiedDate = new Date();
        file.name = picture.name;
        return <File>file;
    };

    return new Promise((resolve, reject) => {
        if (!picture.type.match(/image.*/)) {
            reject(new Error("Not an image"));
            return;
        }

        reader.onload = (readerEvent: any) => {
            image.onload = () => resolve(resize());
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(picture);
    })
};