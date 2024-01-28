import React, { useState } from 'react'
import './FileUpload.scss';
import { MenuItem, Typography, Select, Chip } from '@mui/material';
import ExcelImage from '../../assets/Excel_logo.png';
import Button from '@mui/material/Button';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import * as XLSX from 'xlsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const FileUpload = () => {
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [dropDownOptions, setDropdownOptions] = useState([]);

    // submit state
    const [excelData, setExcelData] = useState(null);

    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            }
            else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
    }

    // submit event
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);

            // select tag items
            const tagItems = Array.from(new Set(data.map(item => item['select tags'])));
            setDropdownOptions(Object.fromEntries(tagItems.map(value => [value, []])));
            setExcelData(data.slice(0, 10));
        }
    }

    return (
        <div className='fileUploadPage' >
            <div className="fileUploadContainer">
                <div className="fileBox">
                    <div className="icon">
                        <img src={ExcelImage} alt="" width='36px' height='36px' />
                    </div>
                    <Typography className='description'>Drop your excel sheet here or browse   <input type="file" className="form-control" required onChange={handleFile} /></Typography>
                    <Button onClick={handleFileSubmit} variant="contained" type="submit" className="buttonContainer" disabled={excelFile ? false : true} style={{ opacity: excelFile ? '' : '40%' }}>
                        <FileUploadOutlinedIcon /> Upload
                    </Button>
                    {typeError && (
                        <div className="alert alert-danger" role="alert" style={{color:'red'}}>{typeError}</div>
                    )}
                </div>
            </div>
            <div className="tableWrapper">
                <h3>Uploads</h3>
                <div className="sheetTable">
                    {excelData ? (
                        // <div className="table-responsive">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table" className='table'>
                                <TableHead>
                                    <TableRow>
                                        {Object.keys(excelData[0]).map((key) => (
                                            <StyledTableCell key={key}>{key}</StyledTableCell>
                                        ))}
                                        <StyledTableCell>Selected Tags</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {excelData.map((individualExcelData, index) => (
                                        <StyledTableRow key={index}>
                                            {Object.keys(individualExcelData).map((key, columnIndex) => (
                                                <StyledTableCell component="th" scope="row" key={key}>
                                                    {columnIndex === 3 ? (
                                                     <Select value={''} onChange={(e) => console.log('Dropdown value selected:', e.target.value)}>
                                                     {dropDownOptions.map((option, optionIndex) => (
                                                       <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
                                                     ))}
                                                   </Select>
                                                    ) : (
                                                        individualExcelData[key]
                                                    )}
                                                </StyledTableCell>
                                            ))}
                                        */}
                                    {excelData.map((individualExcelData, index) => (
                                        <StyledTableRow key={index}>
                                            {Object.keys(individualExcelData).map((key, columnIndex) => (
                                                <StyledTableCell component="th" scope="row" key={key}>
                                                    {columnIndex === 3 ? (
                                                        <Select
                                                        // label='Select Tags'
                                                            multiple
                                                            value={Array.isArray(dropDownOptions[individualExcelData[key]]) ? dropDownOptions[individualExcelData[key]] : []}
                                                            onChange={(e) => setDropdownOptions({
                                                                ...dropDownOptions,
                                                                [individualExcelData[key]]: e.target.value
                                                            })}
                                                        >
                                                            {individualExcelData[key].split(',').map((option, optionIndex) => (
                                                                <MenuItem key={optionIndex} value={option.trim()}>{option.trim()}</MenuItem>
                                                            ))}
                                                        </Select>
                                                        //      <Select value={''} onChange={(e) => console.log('Dropdown value selected:', e.target.value)}>
                                                        //      {individualExcelData[key].split(',').map((option, optionIndex) => (
                                                        //        <MenuItem key={optionIndex} value={option.trim()}>{option.trim()}</MenuItem>
                                                        //      ))}
                                                        //    </Select>

                                                    ) : (
                                                        individualExcelData[key]
                                                    )}
                                                </StyledTableCell>
                                            ))}
                                            <StyledTableCell>
                                                {Array.isArray(dropDownOptions[individualExcelData['select tags']]) && dropDownOptions[individualExcelData['select tags']].length > 0
                                                    ? dropDownOptions[individualExcelData['select tags']].map((selectedTag, tagIndex) => (
                                                        <Chip key={tagIndex} label={selectedTag} />
                                                    ))
                                                    : 'No Tags Selected'}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <div>No File is uploaded yet!</div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default FileUpload
