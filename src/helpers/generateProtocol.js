import { db } from '@/plugins/firebase'
import { ref, runTransaction } from 'firebase/database'

export const generateNextProtocol = async () => {
  const protocolCounterRef = ref(db, 'metadata/protocol_counter')

  const result = await runTransaction(protocolCounterRef, (currentValue) => {
    return (currentValue || 0) + 1
  })

  if (!result.committed) throw new Error('Erro na transaction')

  return result.snapshot.val()
}
