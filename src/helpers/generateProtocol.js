import { db } from '@/plugins/firebase'
import { ref, runTransaction } from 'firebase/database'

export const generateNextProtocol = async () => {
  try {
    const protocolCounterRef = ref(db, 'metadata/protocol_counter')

    const result = await runTransaction(protocolCounterRef, (currentValue) => {
      return (currentValue || 0) + 1
    })

    if (result.committed) {
      console.log('Transação finalizada com sucesso!')
      return result.snapshot.val()
    }
  } catch (e) {
    console.error('Falha ao gerar protocolo no Firebase SDK: ', e)
    throw e
  }
}
