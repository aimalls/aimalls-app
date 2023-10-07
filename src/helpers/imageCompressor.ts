export const compressor = (file: File, thumb?: boolean, callback?: any) => {

    try {
        if (!file) {
            throw "No file to compress.."
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const imgElement : any = document.createElement("img");
            imgElement.src = event.target?.result;

            imgElement.onload = (e: any) => {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = thumb ? 200: 1000;
                const scaleSize = MAX_WIDTH / e.target.width;
                canvas.width = MAX_WIDTH;
                canvas.height = e.target.height * scaleSize;

                const ctx = canvas.getContext("2d");

                ctx?.drawImage(e.target, 0,0, canvas.width, canvas.height);

                const srcEncoded = ctx?.canvas.toDataURL(e.target, "image/jpeg")

                callback(srcEncoded, file.name);
            }
        }

    } catch (err: any) {
        return Promise.reject(err)
    }

}

export const dataURLtoFile = (dataurl: any, filename: string) => {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
}