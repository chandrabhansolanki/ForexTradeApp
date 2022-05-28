import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
// import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  FormGroup,
  NavLink,
  NavItem,
  FormFeedback,
  Button,
  Input,
  Label,
  ModalFooter,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
} from "reactstrap"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min"
import "../../../assets/scss/datatables.scss"

const Bonus = props => {
  const [bonus, setBonus] = useState([])
  // console.log(bonus, "hekkkkkk")
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      accountNumber: "",
      bonus: "",
      amount: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      amount: Yup.string().required("Please Enter Your Amount"),
    }),
    onSubmit: (values, { resetForm }) => {
      setBonus([...bonus, values])
      // dispatch(StaffUsers(values, props.history))
      setModal(!modal)
      resetForm({ values: "" })
    },
  })

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]

  const pageOptions = {
    sizePerPage: 1,
    // totalSize: state && state.length, // replace later with size(customers),
    custom: true,
  }

  const columns = [
    {
      dataField: "name",
      text: "Client Name",
      sort: true,
    },
    {
      dataField: "accountNumber",
      text: "Account Number",
      sort: true,
    },
    {
      dataField: "bonus",
      text: "Bonus",
      sort: true,
    },

    {
      dataField: "amount",
      text: "Amount",
      sort: true,
    },
    {
      dataField: "expiryDate",
      text: "Expiry Date",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      // formatter: (cellContent, row) => handleValidDate(row.createdAt),
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      // formatter: (cellContent, row) => handleValidDate(row.updatedAt),
    },
  ]

  // const handleValidDate = date => {
  //   const date1 = moment(date).format("DD/MM/YY")
  //   return date1
  // }

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Bonus | ForexTrade</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="User" breadcrumbItem="Bonus" />
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={columns}
                      data={bonus && bonus}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={columns}
                          data={bonus || []}
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <Button
                                    type="button"
                                    className="btn-rectangle  mb-2 me-2"
                                    onClick={toggle}
                                  >
                                    Add Bonus
                                  </Button>

                                  <Modal isOpen={modal} toggle={toggle}>
                                    <ModalHeader toggle={toggle}>
                                      Create Bonus
                                    </ModalHeader>
                                    <ModalBody>
                                      <Form
                                        className="form-horizontal"
                                        onSubmit={e => {
                                          e.preventDefault()
                                          validation.handleSubmit()
                                          return false
                                        }}
                                      >
                                        <div className="mb-3">
                                          <Label>Bonus Type</Label>
                                          <select
                                            className="form-select"
                                            onBlur={validation.handleBlur}
                                            name="bonus"
                                            value={
                                              validation.values.bonus || ""
                                            }
                                            onChange={validation.handleChange}
                                          >
                                            <option>select option</option>
                                            <option>Welcome Bonus</option>
                                            <option>Deposit Bonus</option>
                                            <option>Birthday Bonus</option>
                                            <option>other</option>
                                          </select>
                                          {validation.touched.bonus &&
                                          validation.errors.bonus ? (
                                            <FormFeedback type="invalid">
                                              {validation.errors.bonus}
                                            </FormFeedback>
                                          ) : null}
                                        </div>

                                        <div className="mb-3">
                                          <Label className="form-label">
                                            Client Name
                                          </Label>
                                          <Input
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter Your Name"
                                            type="name"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.name || ""}
                                            invalid={
                                              validation.touched.name &&
                                              validation.errors.name
                                                ? true
                                                : false
                                            }
                                          />
                                          {validation.touched.name &&
                                          validation.errors.name ? (
                                            <FormFeedback type="invalid">
                                              {validation.errors.name}
                                            </FormFeedback>
                                          ) : null}
                                        </div>

                                        <div className="mb-3">
                                          <Label>Account Number</Label>
                                          <select
                                            className="form-select"
                                            onBlur={validation.handleBlur}
                                            name="accountNumber"
                                            value={
                                              validation.values.accountNumber ||
                                              ""
                                            }
                                            onChange={validation.handleChange}
                                          >
                                            <option>select option</option>
                                            <option>123456789</option>
                                          </select>
                                          {validation.touched.accountNumber &&
                                          validation.errors.accountNumber ? (
                                            <FormFeedback type="invalid">
                                              {validation.errors.accountNumber}
                                            </FormFeedback>
                                          ) : null}
                                        </div>

                                        <div className="mb-3">
                                          <Label className="form-label">
                                            Amount
                                          </Label>
                                          <Input
                                            name="amount"
                                            className="form-control"
                                            placeholder="Enter Your Amount"
                                            type="number"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={
                                              validation.values.amount || ""
                                            }
                                            invalid={
                                              validation.touched.amount &&
                                              validation.errors.amount
                                                ? true
                                                : false
                                            }
                                          />
                                          {validation.touched.amount &&
                                          validation.errors.amount ? (
                                            <FormFeedback type="invalid">
                                              {validation.errors.amount}
                                            </FormFeedback>
                                          ) : null}
                                        </div>

                                        <div className="mt-3 col-md-12 text-end">
                                          <button
                                            className="btn btn-primary btn-block me-1"
                                            onClick={e => {
                                              e.preventDefault()
                                              setModal(false)
                                            }}
                                          >
                                            close
                                          </button>
                                          <button
                                            className="btn btn-primary btn-block"
                                            type="submit"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </Form>
                                    </ModalBody>
                                  </Modal>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={"id"}
                                      responsive
                                      bordered={false}
                                      striped={false}
                                      // defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="align-items-md-center mt-30">
                                <Col className="inner-custom-pagination d-flex">
                                  <div className="text-md-right ms-auto">
                                    <PaginationListStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </>
  )
}

// Deposit.propTypes = {
//   orders: PropTypes.array,
//   onGetOrders: PropTypes.func,
//   onAddNewOrder: PropTypes.func,
//   onDeleteOrder: PropTypes.func,
//   onUpdateOrder: PropTypes.func,
// }

export default withRouter(Bonus)

// Deposit.propTypes = {
//   history: PropTypes.object,
// }