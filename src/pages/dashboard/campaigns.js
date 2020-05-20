import React, { Component } from 'react';
import { 
    TableContainer, Table, 
    TableHead, TableRow, 
    TableCell, Paper, 
    Button, Snackbar,
    TableBody, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';
import Auth from '../../api/Auth';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Campaigns extends Component {

    constructor(props){
        super(props);
        this.state = { 
          openAlert: false,
          alertMsg: '',
          banners: [],
          alertStatus: 'error',
          inputKey: 0
         };
         this.uploadHandler = this.uploadHandler.bind(this);
         this.fileInput = React.createRef();
         console.log('HERE')

    }

    componentDidMount = async () => {
        let api = new Auth();
        let banners = await api.getBanners();
        if(banners.success){
            this.setState({banners: banners.banners})
        }
        console.log(this.state.banners)
    }

    handleCloseAlert = (e) => {
    this.setState({openAlert: !this.state.openAlert});
    }

    uploadHandler = async (e) => {
        console.log('UPLOADING..................')
        e.preventDefault();
        const data = new FormData() 
        data.append('file', e.target.files[0])
        console.log(e.target.files[0]);
        console.log(this.fileInput.current.files[0]);
        let api = new Auth();
        let response = await api.pushBanner(data);
        if(response.success){
            this.setState({
                alertStatus: 'success',
                alertMsg: 'Upload Successful!',
                openAlert: true})
            let banners = await api.getBanners();
            if(banners.success){
                this.setState({banners: banners.banners})
            }
        }else{
            this.setState({
                alertStatus: 'error',
                alertMsg: 'Upload Failed!',
                openAlert: true}) 
        }

        this.setState({inputKey: this.state.inputKey + 1});
    }

    deleteBanner = async (i, id) => {
        console.log(id);
        let api = new Auth();
        let removeBanner = await api.deleteBanners(id);
        console.log(removeBanner);
        if(removeBanner.success){
            this.setState({
                alertStatus: 'success',
                alertMsg: 'Banner Deleted Successfully!',
                openAlert: true});
            let banners = await api.getBanners();
            if(banners.success){
                this.setState({banners: banners.banners})
            }
            // let newBanners = [...this.state.banners];
            // newBanners.splice(i);
            // this.setState({banners: [...newBanners]})
        }else{
            this.setState({
                alertStatus: 'error',
                alertMsg: 'Failed to Delete Banner at this time!',
                openAlert: true});
        }
    }


    render() {
        return (
            <Paper elevation={1} className="jwb-dashboard-settings" >
                <div>
                    <h4> Campaigns </h4>
                </div>
                <div className="SAMZ">
                    <p> For now, you have only one campaign maximum</p>
                    <Snackbar open={this.state.openAlert} autoHideDuration={6000} onClose={this.handleCloseAlert}>
                        <Alert severity={this.state.alertStatus}>
                            { this.state.alertMsg }
                        </Alert>
                    </Snackbar>
                    <TableContainer component={Paper}>
                        <Table className="" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Order</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Uploaded</TableCell>
                                    <TableCell align="center">Thumbnail</TableCell>
                                    <TableCell align="center">Action</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.banners.length > 0 && 
                                this.state.banners.map( (banner, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="td" scope="row" align="center">
                                                { index }
                                            </TableCell>
                                            <TableCell component="td" scope="row" align="center">
                                                { banner.option_value.name }
                                            </TableCell>
                                            <TableCell component="td" scope="row" align="center">
                                                { banner.createdAt }
                                            </TableCell>
                                            <TableCell component="td" scope="row" align="center">
                                                <img src={'https://api.jubnawebaith.com/' + banner.option_value.path.replace('server/', '')} alt={banner.option_value.name} style={{maxWidth: 100}}/>
                                            </TableCell>
                                            <TableCell component="td" align="center">
                                                <IconButton aria-label="delete" onClick={(e) => this.deleteBanner(index, banner._id)}>
                                                    <DeleteIcon fontSize="large" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                    <input
                        accept="image/*"
                        className=""
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        ref={this.fileInput}
                        type="file"
                        onChange={this.uploadHandler}
                        key={this.state.inputKey}
                    />
                    <label htmlFor="raised-button-file" className="jwb-campains-upload-btn">
                        <Button variant="contained" component="span" className="">
                            Upload
                        </Button>
                    </label>
                    </div>
                </div>
            </Paper>
        );
    }
}