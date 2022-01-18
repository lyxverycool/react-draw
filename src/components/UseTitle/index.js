
import { useEffect, useRef } from 'react'

function useTitle(title, options) {
  const titleRef = useRef(document.title)
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        document.title = titleRef.current
      }
    }
  }, [options])
}

export default useTitle
