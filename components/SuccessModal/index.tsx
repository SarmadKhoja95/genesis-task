import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ICategory, IModalProps } from '../../types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0D2436',
  color: '#FFFFFF',
  boxShadow: 24,
  p: '32px 0 32px',
  textAlign: 'center'
};

export default function SuccessModal({ open, handleClose, result }: IModalProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            Success
          </Typography>
          {result?.map((item: ICategory, ind: number) =>
            <Box key={ind} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', pt: 3 }}>
              <Typography id="modal-modal-title" variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {item?.id}:
              </Typography>
              <Typography id="modal-modal-title" variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {item?.items[0]?.id}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}