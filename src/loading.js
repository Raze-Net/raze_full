import { Loading } from 'element-ui';

let loadingCount = 0;
let loading;

const startLoading = (msg = 'loading……') => {
  loading = Loading.service({
    lock: true,
    text: msg,
    background: 'rgba(0, 0, 0, 0.7)'
  });
};

const endLoading = () => {
  loading.close();
};

export const showLoading = (msg) => {
  if (loadingCount === 0) {
    startLoading(msg);
  }
  loadingCount += 1;
};

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading();
  }
};