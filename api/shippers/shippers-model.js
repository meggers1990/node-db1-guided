const db = require('../../data/db-config')

function get() {


  return db('shippers')
}

function getById(shipperid) {
  

  return db('shippers').where('shipperid', shipperid).first()
 
}

async function create({ shippername, phone }) {

  const [shipperid] = await db('shippers').insert({ shippername, phone })
  return getById(shipperid)
}


async function update(shipperid, { shippername, phone }) { 

  await db('shippers').where('shipperid', shipperid).update({ shippername, phone })
  return getById(shipperid)
}

async function remove(shipperid) {
  
  const onTheChoppingBlock = await getById(shipperid)
  await db('shippers').where('shipperid', shipperid).delete()
  return onTheChoppingBlock
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}