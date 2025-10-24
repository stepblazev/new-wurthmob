import { StyledButton } from '@/components/StyledButton';
import { StyledInput } from '@/components/StyledInput';
import { UserRepository } from '@/repositories/user.repository';
import { useGloader } from '@/stores/gloader.store';
import { useUser } from '@/stores/user.store';
import { sleep, stripTags } from '@/utils/functions';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, ToastAndroid, View } from 'react-native';

interface ILoginForm {
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const { control, handleSubmit, formState } = useForm<ILoginForm>();
    const { showLoader, hideLoader } = useGloader();
    const userStore = useUser();
    
    const onSubmit = async (data: ILoginForm) => {
        showLoader("Выполняется авторизация");
        
        let response = await UserRepository.auth({
            login: data.email,
            password: data.password,
        });
        
        if (response.MESSAGE) {
            await sleep(500);
            ToastAndroid.show(stripTags(response.MESSAGE), ToastAndroid.BOTTOM);
        } else {
            const userId = response;
            response = await UserRepository.getById({ id: userId });
            
            userStore.login(response)
            
            ToastAndroid.show('Успешная авторизация', ToastAndroid.BOTTOM);
            router.replace('/home');
        }
        
        hideLoader();
    };

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name="email"
                rules={{
                    required: 'Введите E-Mail',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Невалидный email',
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <StyledInput
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="E-Mail"
                        errorMessage={formState.errors.email?.message}
                    />
                )}
            />
            
            <Controller
                control={control}
                name="password"
                rules={{ required: 'Введите пароль', minLength: { value: 3, message: 'Минимум 3 символа' } }}
                render={({ field: { onChange, value } }) => (
                    <StyledInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Пароль"
                        secureTextEntry
                        errorMessage={formState.errors.password?.message}
                    />
                )}
            />
            
            <StyledButton label="Войти" icon='key-outline' onPress={handleSubmit(onSubmit)} style={{ marginTop: 24 }} />
            <StyledButton label="Регистрация" icon='person-circle-outline' onPress={() => router.replace('/home')} type="secondary" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
});
