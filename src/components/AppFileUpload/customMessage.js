/**
 * 上传错误信息自定义处理
 * @author chenliangshan
 * @version 2017/09/07
 */

export default ({ up, err, errTip }) => {
  let errMsg
  const plupload = window.plupload

  switch (err.code) {
    case plupload.FILE_SIZE_ERROR: {
      let max_file_size = up.getOption && up.getOption('max_file_size')
      max_file_size = max_file_size || (up.settings && up.settings.max_file_size)
      errMsg = `最大限制可上传${max_file_size}。`
      break
    }
    default: {
      errMsg = errTip
    }
  }

  return errMsg
}
