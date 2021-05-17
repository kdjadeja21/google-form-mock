import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ChipInput from 'material-ui-chip-input'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const FieldDialog = (props) => {
    const defaultForm = {
        title: "",
        field_key: "",
        input_type: "",
        required: false,
        options: [],
    }
    const dispatch = useDispatch();
    const [form, setForm] = useState(defaultForm)
    const fieldDialog = useSelector(state => state.form.form.fieldDialog);

    useEffect(() => {
        if (fieldDialog && fieldDialog.type === 'new') setForm(defaultForm);
    }, [fieldDialog])

    const handleChange = (event) => {
        if (event.target.name === "required") {
            setForm({ ...form, [event.target.name]: event.target.checked });
        }
        else {
            setForm({ ...form, [event.target.name]: event.target.value });
        }
    };

    const fieldTypes = [
        {
            value: 'text',
            label: 'Text',
        },
        {
            value: 'radioButton',
            label: 'Multiple choise',
        },
        {
            value: 'checkbox',
            label: 'Checkboxes',
        },
        {
            value: 'dropdown',
            label: 'Dropdown',
        },
    ];

    const handleAddChip = (chip) => {
        setForm({
            ...form,
            options: [...form.options, chip]
        })
    }

    const handleDeleteChip = (chip, index) => {
        const optionArray = form.options;
        optionArray.splice(index, 1);
        setForm({
            ...form,
            options: optionArray
        })
    }

    const canBeAdded = () => {
        return form.title.trim() && form.input_type;
    }

    const handleSubmit = () => {
        const params = Object.assign({}, form);
        params.field_key = Math.random().toString(36).substring(2);
        props.addField(params)
        dispatch(Actions.closeFieldDialog())
    }

    return (
        <Dialog open={fieldDialog.open}
            onClose={() => dispatch(Actions.closeFieldDialog())}
            fullWidth maxWidth="sm">
            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {/* {indicatorDialog.type === 'new' ? 'New Indicator' : 'Edit Indicator'} */}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent classes={{ root: 'p-0' }}>
                <div className="px-16 sm:px-24">
                    <FormControl style={{ marginBottom: '16px', marginTop: '16px' }} required fullWidth>
                        <TextField
                            label="Title/Question"
                            autoFocus
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </FormControl>
                </div>
                <div className="px-16 sm:px-24">
                    <FormControl style={{ marginBottom: '16px' }} variant="outlined" required fullWidth>
                        <InputLabel id="indicator-type-outlined-label">Field Type</InputLabel>
                        <Select
                            labelId="indicator-type-outlined-label"
                            name="input_type"
                            value={form.input_type}
                            onChange={handleChange}
                            label="Field Type"
                        >
                            {fieldTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {
                    form.input_type && form.input_type !== 'text' &&
                    <FormControl style={{ marginBottom: '16px' }} variant="outlined" required fullWidth>
                        <ChipInput
                            placeholder="Add options"
                            value={form.options}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip, index) => handleDeleteChip(chip, index)}
                        />
                    </FormControl>
                }

                <div className="px-16 sm:px-24">
                    <FormControlLabel
                        control={<Switch
                            checked={form.required}
                            onChange={handleChange}
                            color="primary"
                            name="required"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Required"
                    />
                </div>

            </DialogContent>
            <DialogActions className="justify-between p-8">
                <div className="px-16">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!canBeAdded()}
                    >
                        {fieldDialog.type === 'new' ? 'Add' : 'Update'}
                    </Button>
                </div>
            </DialogActions>
        </Dialog >
    )

}

export default FieldDialog