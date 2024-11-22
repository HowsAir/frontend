import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../../api/apiClient';
import { useAppContext } from '../../contexts/AppContext';
import { ToastMessageType } from '../../types/mainTypes';
import { routes } from '../../routes/routes';
import { useUser } from '../../contexts/UserContext';

const EditProfile = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const { user, updateUser, refreshUser } = useUser();

    const [profile, setProfile] = useState<{
        name: string;
        surnames: string;
        email: string;
        profilePic: string | File;
    }>({
        name: user?.name || '',
        surnames: user?.surnames || '',
        email: user?.email || '',
        profilePic:
            user?.photoUrl ||
            'https://media.tenor.com/G7LfW0O5qb8AAAAj/loading-gif.gif',
    });

    const [originalData, setOriginalData] = useState(profile);
    const [previewUrl, setPreviewUrl] = useState<string>(
        profile.profilePic as string
    ); // For image preview

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const profile = await apiClient.getUserProfile();
                const profileData = {
                    name: profile.name || 'Nombre',
                    surnames: profile.surnames || 'Apellidos',
                    email: profile.email || 'email@falso.es',
                    profilePic: profile.photoUrl,
                };
                setProfile(profileData);
                setOriginalData(profileData);
                setPreviewUrl(profileData.profilePic); // Update preview
                updateUser(profileData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                showToast({
                    message: 'Error al cargar el perfil.',
                    type: ToastMessageType.ERROR,
                });
            }
        };

        if (!user) {
            // Prevent calling if user is already loaded
            getProfileData();
        }

        return () => {
            // Cleanup previous object URLs to avoid memory leaks
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [user, updateUser, showToast]);


    const mutation = useMutation(apiClient.updateUserProfile, {
        onSuccess: async () => {
            showToast({
                message: 'Perfil actualizado correctamente',
                type: ToastMessageType.SUCCESS,
            });
            setOriginalData({ ...profile });
            setPreviewUrl(profile.profilePic as string); // Sync preview with saved profilePic
            updateUser({ ...profile });
            await refreshUser(); // Refresh global user state
            queryClient.invalidateQueries(['userProfile']);
        },
        onError: () => {
            showToast({
                message: 'Error guardando cambios',
                type: ToastMessageType.ERROR,
            });
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfile((prevProfile) => ({
                ...prevProfile,
                profilePic: file,
            }));

            // Create a temporary preview URL for the uploaded file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);

            // Cleanup previous object URLs to avoid memory leaks
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (hasChanges) {
            // Only mutate if there are changes
            const formData = new FormData();
            if (profile.name) formData.append('name', profile.name);
            if (profile.surnames) formData.append('surnames', profile.surnames);
            if (profile.email) formData.append('email', profile.email);

            if (profile.profilePic instanceof File) {
                formData.append('photo', profile.profilePic);
            } else if (typeof profile.profilePic === 'string') {
                formData.append('photo', profile.profilePic);
            }

            mutation.mutate(formData); // Only call mutate when needed
        }
    };


    const handleCancel = () => {
        setProfile({ ...originalData });
        setPreviewUrl(originalData.profilePic as string); // Reset preview
        navigate('/user');
    };

    const hasChanges =
        profile.name !== originalData.name ||
        profile.surnames !== originalData.surnames ||
        profile.profilePic !== originalData.profilePic;

    return (
        <form
            onSubmit={handleSubmit} // Only trigger on submit
            className="mx-auto flex h-fit w-[40dvw] flex-col rounded-lg border-[1px] border-gray bg-white px-20 py-12"
        >
            <h2 className="mx-auto">Editar perfil</h2>
            <div className="relative">
                <img
                    src={previewUrl} // Use the preview URL
                    className="mx-auto size-40 rounded-full text-center"
                    alt="Foto de perfil"
                />
                <label className="absolute right-32 top-28 w-fit cursor-pointer rounded-full border-4 border-white bg-gray p-2 transition-all duration-300 ease-in-out hover:bg-neutral-400">
                    <img
                        className="size-fit"
                        src="../../public/icons/pencil-icon.svg"
                        alt="Editar"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            </div>

            <p className="mx-auto mt-6 text-lg">{profile.email}</p>

            <div className="grid grid-flow-row grid-cols-2 gap-4">
                <input
                    placeholder="Nombre"
                    className="mt-8 h-10 w-full rounded-lg border-[1px] border-gray bg-offwhite p-2 placeholder-neutral-300 caret-primary focus:outline-primary"
                    value={profile.name}
                    onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                    }
                />
                <input
                    placeholder="Apellidos"
                    className="mt-8 h-10 w-full rounded-lg border-[1px] border-gray bg-offwhite p-2 placeholder-neutral-300 caret-primary focus:outline-primary"
                    value={profile.surnames}
                    onChange={(e) =>
                        setProfile({ ...profile, surnames: e.target.value })
                    }
                />
            </div>

            <Link
                to={routes.AUTH.CHANGE_PASSWORD}
                className="btn-primary mt-8 w-full text-center text-base font-medium"
            >
                Cambiar contraseña
            </Link>

            <div className={`relative mt-8 inline-flex w-full gap-4`}>
                <button
                    onClick={handleCancel}
                    className={`btn-primary bg-gray text-base font-medium text-offblack transition-all duration-300 ${
                        hasChanges ? 'relative w-1/2' : 'absolute left-0 w-full'
                    }`}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    disabled={mutation.isLoading} // Disable when loading or no changes
                    className={`btn-primary relative text-base font-medium transition-all duration-300 disabled:bg-gray disabled:text-offblack ${hasChanges ? 'w-1/2' : 'absolute ml-auto w-0 px-0 opacity-0'}`}
                >
                    {mutation.isLoading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </form>
    );
};

export default EditProfile;
