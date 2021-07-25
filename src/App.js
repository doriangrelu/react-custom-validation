import './App.css';
import {useCallback} from "react";
import {FormManager} from "./lib/components/form/FormManager/FormManager";
import {maxLength, minLength} from "./lib/core/defaultValidator";
import {TextField} from "./lib/components/form/TextField/TextField";
import {SubmitFormButton} from "./lib/components/form/FormButton/SubmitFormButton";


function App() {
    const handleSubmit = useCallback((data) => {
        console.log(data);
    }, []);

    return (
        <div className="App">
            <FormManager
                defaultValue={{firstname: "dorian"}}
                onSubmit={handleSubmit}
                liveValid={true}
                validator={{
                    firstname: [
                        "email",
                        "required",
                        "notEmpty",
                        minLength(4),
                        maxLength(100)
                    ]
                }}
            >
                <TextField name="firstname">Prénom</TextField>
                <TextField name="firstname">nom</TextField>

                <SubmitFormButton>Envoyer</SubmitFormButton>
            </FormManager>
        </div>
    );
}

export default App;
