import { TextField } from '@mui/material';
import Container from '@mui/material/Container';

export default function TextInput(props: any) {
    const onTextInput = (event: any) => {
        if (event.key == "Enter") {
            props.onInputValidated(event.target.value)
            event.target.value = ""
        }
    }

    return (
        <Container sx={{ background: 'yellow' }}>
            <TextField fullWidth autoFocus={true} onKeyUp={onTextInput} />
        </Container >
    );
}
