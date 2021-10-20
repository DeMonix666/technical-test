import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import _ from '@lodash';
import { 
	Table, 
    TableBody, 
    TableCell, 
    TableHead, 
	TableRow, 
    TablePagination,
    Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
import MyPagination from 'app/fuse-layouts/shared-components/MyPagination';
import { getPhotos } from '../store/photosSlice';

function PhotosTable(props) {
    const dispatch = useDispatch();
    const photos    = useSelector(({ dashboardReducer }) => dashboardReducer.photos);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [init, setInit] = useState(true);
    const routeParams = useParams();

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

	useEffect(() => {
        setLoading(true);

        dispatch(getPhotos({
            page: 0,
            category: routeParams.category
        }))
        .then(() => setLoading(false));
    }, [dispatch, routeParams]);
   
    const handleClick = (n) => {
        
    };

    const handleChangePage = (event, value) => {
        setLoading(true);

        dispatch(getPhotos({
            page: value,
            category: routeParams.category
        }))
        .then(() => setLoading(false));
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);

        dispatch(getPhotos({
            page: 0,
            category: routeParams.category
        }))
        .then(() => setLoading(false));
    }

    if (loading) {
        return <FuseLoading />;
    }

    if (photos.collection.length <= 0) {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No photos found
                    </Typography>
                </div>
            </FuseAnimate>
        );
    }
    
	return (
        <div className="w-full">
            <FuseScrollbars className="overflow-x-auto">
                <div className="">
                    <div className="">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-3 gap-4 w-full"
                        >

                            {photos.collection.map((n, i) => {
                                return (
                                    <motion.div variants={item} className="h-400 p-16 col" key={i}>
                                        <img src={n.url} alt={n.name} className="image" />
                                        <div className="middle">
                                            <Button
                                                component="a"
                                                href={n.url}
                                                target="_blank"
                                                className="whitespace-nowrap mx-4"
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Download
                                            </Button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </FuseScrollbars>

            <TablePagination
                className="flex-shrink-0 border-t-1"
                component="div"
                count={photos.pagination.total}
                rowsPerPage={photos.pagination.limit}
                page={photos.pagination.page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(PhotosTable);
