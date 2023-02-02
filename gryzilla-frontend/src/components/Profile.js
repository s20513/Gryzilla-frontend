import { Profiler, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

export default function Profile() {

    const [photoBase64, setPhotoBase64] = useState();

    const fetchAvatar = async () => {
        //setLoading(true);
        //setError(null);
        const id = 10;
        let response;
        try {
            response = await axios.get(`/users/photo/${id}`);
            setPhotoBase64(response.data);
            //setError(null);
        } catch(err) {
            //setError(err.message);
            setPhotoBase64(null);
        } finally {
            //setLoading(false);
            //console.log(response.data);
        }
    }

    useEffect( () => {
        fetchAvatar();
    },[]);

    function getBase64Img() {
        return "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEA8PDxAPDw8PDw8ODQ8PDQ8NDw8NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi0dFx0tLS0tLS0tLSsrLS0rKy0tLSstLS0tLS0tLS0rKy0tLS0tLTc3Ny0rLS0tLSsrLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIDBAUGB//EADMQAAIBAgUCAwYGAgMAAAAAAAABAgMRBAUSITFBUQZhcRQVIjJSkQcTQoGhsWJyIzPw/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAIBEBAQADAAICAwEAAAAAAAAAAAECAxESIQQxEyJBUf/aAAwDAQACEQMRAD8A2wAfMfLAAAAAAAAQSAAAQHAAAXgCUhYcXiASQxxOAABwAAQAAAAAAAAAAAAAAAAAAAAAAgEWCSAwVQAlGVESiSCqWKtFrhlFQLAiUABGQAAAAAAAAAAAAAAAAAFABFrDi8VsC5VheIBIsUQSjQxmbUqd7u7XRGkvE1L6WOJ2R3irNXBZhTrfI9+z5NpheoRZEGljM2pUtnJN9luDrdZBxl4kpXtZnUwuLhVV4O/9jjLKAwQAAQAAAAAAAAAAAAAEpE6SIl0VuK2DJuQUExJeZWdRRV5NJeZysZn1OG0fiZEucjrI5HiDMnRjpj80l9jkYjPqsvl29Dl4mvKcrzbb8xGPySu34c8NVse3JvRTW8qj4/k9cvw3wtSLVLEqdVLhST39LnE8eV6uGyfDey6oQqW/OlB25XdHzbwpjsUsZh/yalVzdWKspyd15o9eGuWPVq0zLHtenx2Fq4DEOEtnCX3R6PD51RlFNys2t15mb8WKVq1GT+eVKOv/AGPJYXAylDUrbnn2frXk3fpXaznOVp00pJt8vsYfDvhOvjr1LqFNfNOfFjh4elqrRg/1SUZfc+i/ic62EyqjDCaoxlZVZQW6jbrY3qxmTeqeda9X8OaU4v2fFxqVYrePwvf9jx8VVwddwneLhK0l3Xc4XgHEYv2/D+zzqNurHXvJpxvvc93+KLXtrta6gtVvqOmeuSO27VMJ2OpRmpxUlw0XsaeSf9ML9jePLXLHliukWLEMLxUEkEZoAAgAAAAABAsgsiEWbBEpJK74RWkSdt3wcnMc7jT2hZs5+c5u5NwpvbhtGhhMDKp8UnZfyxbxw2bfFFfHVK73u+yXBejlrfzOxv0KMYbRRmaOVzeDP5FrXpYSEN0rnPzjD8TS2tudhETipJpoz5sYZ2XrpeEs/wALWoPAY9J0n8rfQ9Xk+RZLlzeIounqSupOSbXofK8RlL3cHfy6mP2Gs1be3nLY9mv5HI+pp+ZJjx0fGede3YqUk7wT0w9DNho6IRj5GpgMs0PVKzfRdjeZ59uzteD5e/yrh5hSdOprXe6fZn1bwh4pw2Mw8cNitOpLTJTtaR4CrRU4uMkcupl1SDbhv6cm9O3xdfjfI8X2TGV8ryynKpRhSjUs9KhZybPjOcY+WJrTqy3c5N/sSsHWntK9u8m7HRwmXRgrS3b6nbZu7Ho3/LmU4zZNm9rU52SWyPSU5Jq64PEY/BOD1R4OhkeatWpzfwvhnn8pWNO3r1AZCmrIlmvT1qsgtYhhmoABGQAAAAARZFS4iwPPeIMztenF+p1szxapQcuvT1PHRg61TvfdstY258jLl+G1vU+DqrbZcExiorStrFDhlk+Rt2W1Yhk3CMdcloFiqLGXWfTDbcuTZEFlY5YNkFmirHUyLk6ioNJ1e5JjLJkqy/6ira1n1OPjKDg7rhnYkYq9PVFxf/mXF0w2XHJt5Bj9a0S5XB2zwmHrOhVXk1f0PcUailGMl1R2j6unPrIRIkqzdd6gAEYAAAJsQTEsXhpLAiTsmF+nmPE+KvJQXCW/qY8qo6Y6ny/6NLGy11pPvKx14qyS8jGd48Hys0kOJZIg8/Xgs6hIlIiJeIqSAIkQRvvFgUJHDyWZSRKYaKzl7VSJsSkGwyiwsCbgQCGWRSfblZtTSkpd+TveHK+qlZ8xf8HLzSneF10MvhapaUo91sdsK+j8fJ6i9zGzJEozo+hfaAARgAABlolS6LGwxYh/BJ+TMpixK+CXo/6CX+vD0N6i/wBjuVNrHEw21Rep3J9DlsfL+SRZDKg4vJ5ekxMiMaLJkXEZBJNitfatilarGCvIuaWbUZSitN3blFi4Yy32t7xpd7ETzWl3uciGAqP9P3NiOT1H9KOs49P49fPtsyzmK4TZT3yvp/kosll9a+xaOS95I1zFOake+f8AH+SVnK+gv7mj9RV5PH6mTmJzUss6X0mzhcfCpstpdjSlk3aX3M2By505am0+eCXiZfj56beO+SRr+G3/AMv7My5g7Qd+pHhmneo32RcI1oj1cSrLIM6Ppz6UYJZBEoAAyFkyouVqVcrPdNFrkMLXg8dFwrSXFpHapvUk12MPijC2kppc8+pgyqvtof7HPN835GHXQsUZkasVaODxZRCRZkJEshJ6HsSmVYC9SyGxIqWM28qUXsULXLetY3/UsqyWwSWpVbi5BKRWZ7QmAUr1VBXYhJbeNHN6t7RX7nY8M4a0NT6/0cChTdaokur/AIPbYalohGK6Kx6MY+p8fDjLYBElte1VlWXZRhMgABkABegmWKkhqVrY/CqrBxf7HjMRSlRn5p/c94c/NsrjWV1tNceZnKOeeHY5eGxSqRXR9UZFJLlpfucWpSnQlZ3VjTq4iUndsxcOvn5aPb1LIMGBbdOO93YzXscrjx58540bCIbCJxjqzRDRKIkxFy4oWRjlUgnZtIyqPbdGuJMaMglIWM/0VLX6ESmo7yaRo4jMo8Q3fc1xrHXa3K1RQV2zkYis6srd9kjE5zqSS78Hp8oyaNP4pby/o6Y4vXp0+/aciy1Uo6pfM/4R2EiCTrH0cJwuLkMWMtpbKMsQys1AACcARcXCJL2MVy6kI1ItYNFXOxqYjNKUOZK/a/UL1zfFFeMYKLScpcHmMNhZVXaCbZlzjHOtUb6LaJ6LwxgnCGtreW/7GnC/teOFKnUpPiUbGWGZSXKT9T2NWjGS+JJnNxeT0Hz8H8GLixnon9caOZp8xsZoY+m+tjk5lGFOo4wepdWZsuwFSunKPC7k8Hny0Trp+2U+5aOLp9zWeQ1uy+5T3HW7L7i4E+M5uYVr1G09uh0MBmKjBKV2zRzDAzpNa1zwZcowLrXSaVi+M46fi9cbs82XSJq1cxnLh2OxR8Ox/VL7G9h8mow6X9STAmh5elSq1dknI3fcU1CU5bWV7HqKdOMflSXoiuMqRjCWqyi073N+LtjqkjweDqaakb9Gj6FRleKfdHziclrduL3R6/Js3hNKnL4ZxVt+oaxykdllikZE3K6xZkENhMw0sUJbKXKlWBW4CK3FytxcosTcpcXCubndCrUtonpj+o49TL4QTlNuXqeoq8Oyv5Hn8yozqLTZrfcWOGzDK/TiOg7fmfp1beh7XAYuH5cLNcI4GJor8rQlulx5jARcYKL6FxhpmXfbsZljZKNqLWpnGnha1S8qtR7dmbUjFiZycHFcstjW7HL+ODOg7y03cU+T1WUYyEKcVFdN35nOw+H00mny07mLK01Fp92TGMare+49J7yXYrPM0uhzLmHFpuDUeWb49Vnpq5zjfaHaKdodTBlzq01+ZT3Se6OhhsOoU5L9TTv6mLLNoyT4vwzn7ePPLLv06mDz6M1ZxtLqjdWYrqmcL2WGrUlZmxfobkejX7nt1/eEPM4Wc4p16kaUbqPMjKVsk7rnuXxaznZ6aOMpKE6dkudzbxWCUrSg1Ga3VtiatNTs5b248i6Zz8K8005ddbKZVNH/ACNalxZ9DeTPPwm+jZu4SrUvZ3aN+PHpmPHUuLmNMm5nirSK3IciLkFgVuQE9K3FylxcqL3Fylw2FZEw7dTGmTcqjoxfKRjeDg+hlUi1x0jVlgI+ZV5eujNy5Fx1rrQeW/5ErLLdTeuTcd4k9Of7vfcLLn3N+4uXyVz3l0u4WWvujo3BOpyOesufcn3c+5v3IuPKr1pe7/MlZeu7Ny4uXyOtaOAiXWDh2Muom5OnVY0orojJe3BjuLl6lZdRWTK6iGyItcXKXFyJV7gpcgIrcXKXFw1xe4uUuTcHFkxqKXFwMikX1GG4uBl1DUYri5VZbjUYtQ1Dh1luLmLUNQ4dZbjUY7jUOHWXURqMakLjh1kuNRjuRcDJqI1FLi4RbUTcoALXFyrZFwL3FylxcgvcFLkgVAAAMAAAAAAAEgFgAAAACwSQAARLJBBDIAFBEACCQABAAAAAgAAD/9k=";
    }

    return (
        <Container className="column-container">
            <Container className="d-flex justify-content-between">
                <h2>Mój profil</h2>
            </Container>
            <img 
                className="profile-img"
                src={getBase64Img()}
                //src="https://picsum.photos/250"
                alt="profile picture"
            />
            
        </Container>
    );
}