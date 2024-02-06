import { useEthereum } from './contexts/EthereumContext'
import Button from '../common/Button';

function ConnectButton() {
  const { connect, disconnect, account } = useEthereum()

  return (
    <div>
      {!account ? (
        <Button
          onPress={connect}
        label="Connect Wallet" />
        
      ) : (
        <Button
            onPress={disconnect}
            label={"Disconnect"} />
      )}
    </div>
  )
}

export default ConnectButton