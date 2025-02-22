import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const useImagePicker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpenCamera = async () => {
    setLoading(true);
    setError(null);

    try {
      const permissions = await Camera.checkPermissions();

      if (permissions.camera !== 'granted') {
        const permissionRequest = await Camera.requestPermissions();
        if (permissionRequest.camera !== 'granted') {
          setError('Permissions not granted for camera access');
          return;
        }
      }

      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      if (image) {
        setImage(image.dataUrl!);
      }
    } catch (err) {
      setError('Error accessing camera');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenGallery = async () => {
    setLoading(true);
    setError(null);

    try {
      const permissions = await Camera.checkPermissions();

      if (permissions.photos !== 'granted') {
        const permissionRequest = await Camera.requestPermissions();
        if (permissionRequest.photos !== 'granted') {
          setError('Permissions not granted for photo access');
          return;
        }
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      if (image) {
        setImage(image.dataUrl!);
      }
    } catch (err) {
      setError('Error accessing photo gallery');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    image,
    error,
    loading,
    handleOpenCamera,
    handleOpenGallery
  };
};

export default useImagePicker;
