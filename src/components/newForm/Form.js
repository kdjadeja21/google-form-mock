import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Actions from './store/actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FieldDialog from './dialogs/FieldDialog';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const Form = (props) => {

    const defaultForm = {
        form_name: "",
        form_slug: "",
        fields: [],
    }

    const dispatch = useDispatch();
    const routeParams = useParams();
    const formData = useSelector(state => state.form.form)
    const [form, setForm] = useState(defaultForm)
    const [formResponse, setFormResponse] = useState([]);

    useEffect(() => {
        if (routeParams.formId !== 'new') {
            dispatch(Actions.getForm(routeParams))
            setForm(formData)
        }
    }, [dispatch, routeParams, formData])

    const addField = (fieldData) => {
        setForm({
            ...form,
            fields: [...form.fields, fieldData]
        })
    }

    const handleChange = (event, field) => {
        if (routeParams.formId !== "new") {
            if (field && field.input_type !== "checkbox") {
                setFormResponse({ ...formResponse, [event.target.name]: event.target.value })
            }
            else {
                if (!formResponse[event.target.name]) {
                    formResponse[event.target.name] = [];
                }
                event.target.checked ? formResponse[event.target.name].push(event.target.name) :
                    formResponse[event.target.name].splice(formResponse[event.target.name].indexOf(event.target.name), 1)
            }
        }
        else {
            setForm({ ...form, [event.target.name]: event.target.value });
        }
    }

    const canBeSubmitted = () => {
        return form.form_name.trim() && form.fields.length > 0;
    }

    const handleSubmit = () => {
        if (routeParams.formId !== "new") {
            const params = {
                form_id: formData.form_id,
                response: formResponse
            }
            dispatch(Actions.saveResponse(params));
        }
        else {
            const params = form;
            params.form_slug = Math.random().toString(36).substring(2);
            dispatch(Actions.saveForm(params))
        }
    }

    return (
        <>
            <FieldDialog addField={addField} />
            <AppBar position="static" >
                <Toolbar style={{ display: 'flex' }}>
                    <Typography variant="h6">
                        {form.form_name !== '' ? form.form_name : "New Form"}
                    </Typography>
                    {
                        routeParams.formId === "new" && (
                            <>
                                <Button className="newFormButton" onClick={() => dispatch(Actions.openFieldDialog())} variant="contained" color="primary">Add Question</Button>
                                <Button className="newFormButton" onClick={handleSubmit} variant="contained" color="primary" disabled={!canBeSubmitted()}>Save Form</Button>
                            </>
                        )
                    }

                </Toolbar>
            </AppBar>

            <div>

                <Card className={routeParams.formId !== "new" ? 'hidden' : 'card'}>
                    <FormControl required fullWidth>
                        <TextField
                            label="Form title"
                            autoFocus
                            name="form_name"
                            value={form.form_name}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </FormControl>
                </Card>

                {
                    form.fields.length > 0 && form.fields.map(field => {
                        if (field.input_type === "text") {
                            return (
                                <Card key={field.field_key} className="card">
                                    <FormControl
                                        required={field.required}
                                        fullWidth
                                    >
                                        <TextField
                                            label={field.title}
                                            name={field.field_key}
                                            value={form.field_key}
                                            onChange={(event) => handleChange(event, field)}
                                            required={field.required}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Card>
                            )
                        }

                        if (field.input_type === "radioButton") {
                            return (
                                <Card key={field.field_key} className="card">
                                    <FormControl
                                        required={field.required}
                                        fullWidth
                                        onChange={(event) => handleChange(event, field)}
                                    >
                                        <FormLabel component="legend">{field.title}</FormLabel>
                                        <RadioGroup name={field.field_key}>
                                            {
                                                field.options.map(option =>
                                                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                                                )
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </Card>
                            )
                        }

                        if (field.input_type === "checkbox") {
                            return (
                                <Card key={field.field_key} className="card">
                                    <FormControl
                                        variant="outlined"
                                        required={field.required}
                                        fullWidth
                                        onChange={handleChange}
                                    >
                                        <FormLabel component="legend">{field.title}</FormLabel>
                                        {
                                            field.options.map(option =>
                                                <FormControlLabel
                                                    key={option}
                                                    control={
                                                        <Checkbox
                                                            onChange={(event) => handleChange(event, field)}
                                                            name={option}
                                                            color="primary"
                                                        />
                                                    }
                                                    label={option}
                                                />
                                            )
                                        }
                                    </FormControl>
                                </Card>
                            )
                        }

                        if (field.input_type === "dropdown") {
                            return (
                                <Card key={field.field_key} className="card">
                                    <FormControl
                                        required={field.required}
                                        fullWidth
                                        onChange={handleChange}
                                    >
                                        <InputLabel id="indicator-type-outlined-label">{field.title}</InputLabel>
                                        <Select
                                            labelId="indicator-type-outlined-label"
                                            name={field.field_key}
                                            defaultValue={field.options[0]}
                                            onChange={(event) => handleChange(event, field)}
                                            label={field.title}
                                        >
                                            {field.options.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Card>
                            )
                        }
                        return (<></>)
                    })
                }
                {
                    routeParams.formId !== "new" &&
                    <Button
                        className="button"
                        onClick={handleSubmit}
                        style={{ justifyContent: 'flex-end' }}
                        color="primary"
                        variant="contained">
                        Submit
                    </Button>
                }
            </div>
        </>
    )
}

export default Form