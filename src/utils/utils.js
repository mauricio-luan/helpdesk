export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return (
    date.toLocaleDateString('pt-BR') +
    ' ' +
    date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  )
}

export const handleApiError = (error) => {
  if (error.response) {
    const errorMessage = error.response.data?.error ? error.response.data?.error : 'Erro no server'
    throw { status: error.response.status, message: errorMessage }
  } else if (error.request) {
    throw { message: 'Sem conxão com server. Verifique a internet.' }
  } else {
    throw error
  }
}
