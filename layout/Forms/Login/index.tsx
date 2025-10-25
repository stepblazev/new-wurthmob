import { StyledButton } from '@/components/StyledButton';
import { StyledCheckbox } from '@/components/StyledCheckbox';
import { StyledInput } from '@/components/StyledInput';
import { StyledText } from '@/components/StyledText';
import { COLORS } from '@/constants/colors';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { UserRepository } from '@/repositories/user.repository';
import { useGloader } from '@/stores/gloader.store';
import { useUser } from '@/stores/user.store';
import { inDev, sleep, stripTags } from '@/utils/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';

interface ILoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const { showLoader, hideLoader } = useGloader();
    const userStore = useUser();
    
    const { control, handleSubmit, formState } = useForm<ILoginForm>({
        defaultValues: {
            remember: false
        }
    });
    
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
            const userData = await UserRepository.getById({ id: userId });
            userStore.login(userData);
            
            if (data.remember) {
                await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
            } else {
                await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
            }
            
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
            
            <Controller
                control={control}
                name="remember"
                render={({ field: { onChange, value } }) => (
                    <StyledCheckbox checked={value} onCheck={() => onChange(!value)} label='Запомнить меня' />
                )}
            />
            
            <TouchableOpacity onPress={() => inDev()}>
                <StyledText style={styles.resetPassword}>Забыли пароль?</StyledText>
            </TouchableOpacity>
            
            <StyledButton label="Войти" icon='key-outline' onPress={handleSubmit(onSubmit)} style={{ marginTop: 12 }} />
            <StyledButton label="Регистрация" icon='person-circle-outline' onPress={() => inDev()} type="secondary" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    resetPassword: {
        marginTop: 12,
        color: COLORS.RESET_PASSWORD_TEXT,
        textAlign: 'center'
    }
});
