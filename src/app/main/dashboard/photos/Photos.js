import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Typography, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import reducer from '../store';
import PhotosTable from './PhotosTable';

const useStyles = makeStyles({
	layoutRoot: {}
});

function Photos(props) {
    const classes  = useStyles();
    const dispatch = useDispatch();
    const photos     = useSelector(({ dashboardReducer }) => dashboardReducer.photos);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
                <div className="flex flex-1 w-full items-center justify-between">
                    <div className="flex flex-col items-start max-w-full min-w-0">
                        <div className="flex items-center">
                            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>				
                                <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                    Shared Photos
                                </Typography>
                            </motion.div>
                        </div>                  
                    </div>
                </div>                
            }
			content={
				<div className="p-24">
					<PhotosTable />
				</div>
			}
		/>
	);
}

export default withReducer('dashboardReducer', reducer)(Photos);