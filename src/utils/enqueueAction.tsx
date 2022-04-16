import { Button } from '@mui/material';

interface Options {
  key: any;
  closeSnackbar: Function;
}
//dismiss button for notistack
const enqueueAction = (options: Options) => (
  <>
    <Button
      onClick={() => {
        options.closeSnackbar(options.key);
      }}
    >
      DISMISS
    </Button>
  </>
);
export default enqueueAction;
