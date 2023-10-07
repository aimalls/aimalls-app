import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { InputCustomEvent, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import { image } from "ionicons/icons";
import { compressor, dataURLtoFile } from "../helpers/imageCompressor";
export interface iSingleImageUploadProps {
    value: File | null,
    onChange: (image: File, thumb: File) => void
}
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

type b64 = {
    index: number,
    image: string
}



export const SingleImageUpload: FC<iSingleImageUploadProps> = ({ onChange, value }): JSX.Element => {

    const makeid = (length: number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }


    const inputFile = useRef<HTMLInputElement>(null)

    const [compressedFile, setCompressedFile] = useState<File>()
    const [compressedFileThumb, setCompressedFileThumb] = useState<File>()
    const [compressedFileThumbB64, setCompressedFileThumbB64] = useState<string>()


    useEffect(() => {
        if (compressedFile && compressedFileThumb) {
            onChange(compressedFile, compressedFileThumb)
        } else {
            if (value) {
                handleSyncImage(value)
            }
        }
    }, [compressedFile, compressedFileThumb])



   

    const handleInputFileChange = async (file?: any) => {
        if (!file) {
            return 
        }
        
        const the_file = file.target.files[0]
        handleSyncImage(the_file)
    }

    const handleSyncImage = async (the_file: any) => {
        
        

        setCompressedFile(undefined)
        setCompressedFileThumb(undefined)
        setCompressedFileThumbB64(undefined)
        


        await compressor(the_file, false, async function (result: any, file_name: any) {

            let image = dataURLtoFile(result, file_name)
            setCompressedFile(image)

        });

        await compressor(the_file, true, async function (result: any, file_name: any) {

            let image = dataURLtoFile(result, file_name)
            setCompressedFileThumb(image)
            var reader = new FileReader();
            reader.readAsDataURL(image);

            reader.onload = () => {
                setCompressedFileThumbB64(reader.result?.toString()!)
            }

        });
        
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }} key={makeid(7)}>
            <IonButton fill="clear" size="large" className="placeholder-button" onClick={() => inputFile.current?.click()}>
            { compressedFileThumbB64 ? (
                <img src={compressedFileThumbB64} style={{ height: '50px', width: '50px', border: "thin solid var(--ion-color-primary)", objectFit: 'contain', marginRight: '5px' }} />
            ) : <IonIcon icon={image} size="large"></IonIcon> }
            </IonButton>
            <input ref={inputFile} type="file" className="ion-hide" onChange={(e) => handleInputFileChange(e)} />
        </div>
    )
};
export default SingleImageUpload;