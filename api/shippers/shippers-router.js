const express = require('express')
const Shipper = require('./shippers-model')
const { checkId, checkPayload } = require('./shippers-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const shippers = await Shipper.get()
    res.json(shippers)
  } catch (err) { next(err) } 
})

router.get('/:shipperid', checkId, async (req, res) => {
  res.status(200).json(req.shipper)
})

router.post('/', checkPayload, async (req, res, next) => {
  try {
    const newShipper = await Shipper.create(req.body) 
    res.status(201).json(newShipper)
  } catch (err) { next(err) }
})

router.put('/:shipperid', checkPayload, checkId, async (req, res, next) => {
  try {
    const updatedShipper = await Shipper.update(req.params.shipperid, req.body) 
    res.status(200).json(updatedShipper)
  } catch (err) { next(err) }
})

router.delete('/:shipperid', checkId, async (req, res, next) => {
  try {
    const deletedShipper = await Shipper.remove(req.params.shipperid)
    res.status(200).json(deletedShipper)
  } catch (err) { next(err) }
})


router.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router