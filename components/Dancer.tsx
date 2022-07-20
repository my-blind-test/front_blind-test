import Container from '@mui/material/Container';
import Image from 'next/image';

export default function Dancer(props: any) {
    const position = {
        // x: Math.floor(Math.random() * 50),
        // y: Math.floor(Math.random() * 90)
        x: 0,
        y: 0,
    }

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ position: 'relative', top: position.x, left: position.y, border: '1px red solid' }}>
                {props.user.name}
                {/* <Image alt="body" src={require("../static/images/stickman.png")} style={{
                    zIndex: 1,
                    position: 'absolute',
                    width: "100px",
                    height: "auto",
                }} />
                <Image alt="hat" src={require("../static/images/hat.png")} style={{
                    zIndex: 2,
                    position: 'absolute',
                    marginTop: '20px',
                    width: "66px",
                    height: "auto",
                }} /> */}
            </div>
        </Container>
    );
}