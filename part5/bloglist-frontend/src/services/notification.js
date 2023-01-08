import { editNotification, reset } from "../reducers/notificationReducer"

const notify = (message, type = "info", dispatch) => {
  dispatch(editNotification({ message, type }))
  setTimeout(() => {
    dispatch(reset(null))
  }, 5000)
}

export default { notify }
