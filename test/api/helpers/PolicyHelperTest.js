/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
var expect = require("chai").expect
var should = require("chai").should
var assert = require("chai").assert
var sinon = require("sinon")
var helper = require("../../../api/helpers/PolicyHelper")
var httpMocks = require("node-mocks-http")
var mockRequest = httpMocks.createRequest({
  method: "GET",
  url: "/MockUrl"
})
var mockResponse = httpMocks.createResponse()
var latestProdVersionData = [
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 1,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "active",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  },
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 2,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "active",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  }
]
var prodIsNotLatestVersion = [
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 1,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "active",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "active",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  },
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 2,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  }
]
var noActivePordVersion = [
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 1,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "active",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  },
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 2,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  }
]
var devActivePolicyAscVersionNumber = [
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 1,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "active",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  },
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 2,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  }
]
var devActivePolicyDescVersionNumber = [
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 2,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 2,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  },
  {
    location: "string",
    revisionId: 0,
    policyId: 11,
    version: 1,
    description: "string",
    createdBy: "string",
    createdDate: 0,
    lastModifiedBy: "string",
    lastModifiedDate: 0,
    activations: [
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "prod",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "deactiveted",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      },
      {
        serviceVersion: "string",
        apiVersion: "string",
        network: "staging",
        policyInfo: {
          policyId: 11,
          name: "string",
          version: 1,
          status: "active",
          statusDetail: "string",
          detailCode: 0,
          activatedBy: "string",
          activationDate: 0
        },
        propertyInfo: {
          name: "string",
          version: 0,
          groupId: 0,
          status: "string",
          activatedBy: "string",
          activationDate: 0
        }
      }
    ]
  }
]
var zeroVersionOfAPolicy = []
describe("Testing policy helper", function() {
  describe("Testing get policy by version", function() {
    describe("Testing get policy by version error condition ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var errorData = JSON.stringify({
            errorCode: "-1",
            errorMessage: "Resource not found"
          })
          mockResponse.status(404)
          fn(errorData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing error condition with 404 status", function(done) {
        helper.getPolicyByVersion(mockRequest, mockResponse, {
          id: 1,
          version: 1
        })
        expect(mockResponse.statusCode).to.equal(404)
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal(
          "Resource not found"
        )
        done()
      })
    })

    describe("Testing get policy by version for 200 server status ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            location: "/some/location",
            policyId: 1,
            version: 90,
            activations: [],
            createdBy: null
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing get policy by version for 200 server status ", function(
        done
      ) {
        helper.getPolicyByVersion(mockRequest, mockResponse, {
          id: 1,
          version: 1
        })
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()
        expect(data["location"]).to.be.a("string")
        expect(data["policyId"]).to.be.an("number")
        expect(data["version"]).to.be.an("number")
        expect(data["activations"]).to.be.an("array")
        expect(data["createdBy"]).to.be.undefined

        expect(data["location"]).to.equal("/some/location")
        expect(data["policyId"]).to.equal(1)
        expect(data["version"]).to.equal(90)
        expect(data["activations"].length).to.equal(0)
        done()
      })
    })
  })

  describe("Testing validate policy", function() {
    describe("Testing validate STAGING policy - get policy info call error condition ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var errorData = JSON.stringify({
            errorCode: "-1",
            errorMessage: "Resource not found"
          })
          mockResponse.status(404)
          fn(errorData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing error condition with 404 status", function(done) {
        helper.validatePolicyRules(
          mockRequest,
          mockResponse,
          "1",
          "1",
          "staging"
        )
        expect(mockResponse.statusCode).to.equal(404)
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal(
          "Resource not found"
        )
        done()
      })
    })

    describe('Testing validate STAGING policy with a rule having "Source Url HTTP request error" -  200 server status ', function() {
      var egStub = ""
      var policyHelper
      var request
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            matchRules: [
              {
                type: "erMatchRule",
                akaRuleId: "3838940efb0bebde",
                location:
                  "/cloudlets/api/v2/policies/6804/versions/1/rules/3838940efb0bebde",
                matches: [
                  {
                    matchOperator: "equals",
                    matchType: "path",
                    matchValue: "/tiny-url/vuudrs"
                  }
                ],
                redirectURL: "https://goo.gl/maps/vUdRS",
                statusCode: 301,
                useIncomingQueryString: true
              }
            ]
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })

        sinon.stub(helper.getProxyRequest(), "get", function(
          sourceUrl,
          callbackFunction
        ) {
          var err = true
          var body = {}
          var policyValidationResultData = {
            //no response
          }
          mockResponse.status(200)
          callbackFunction(err, policyValidationResultData, body)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
        helper.getProxyRequest().get.restore()
      })
      it("Testing validate policy for 200 server status ", function(done) {
        helper.validatePolicyRules(mockRequest, mockResponse, "1", "1", "noenv")
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()
        // Final destination page error scenario
        expect(data[0]["source"]).to.be.a("string")
        expect(data[0]["destination"]).to.be.an("string")
        expect(data[0]["statusCode"]).to.be.an("number")
        expect(data[0]["finalDestination"]).to.be.an("string")
        expect(data[0]["redirectsFollowed"]).to.be.an("number")
        expect(data[0]["redirects"]).to.be.an("array")
        expect(data[0]["validation"]).to.be.an("boolean")
        expect(data[0]["message"]).to.be.an("string")

        expect(data[0]["source"]).to.equal("undefined/tiny-url/vuudrs")
        expect(data[0]["destination"]).to.equal("https://goo.gl/maps/vUdRS")
        expect(data[0]["statusCode"]).to.equal(0)
        expect(data[0]["finalDestination"]).to.equal("")
        expect(data[0]["redirectsFollowed"]).to.equal(0)
        expect(data[0]["redirects"].length).to.equal(0)
        expect(data[0]["validation"]).to.equal(false)
        expect(data[0]["message"]).to.equal(
          "Source URL HTTP Request failed with error: true"
        )

        done()
      })
    })

    describe('Testing validate STAGING policy with a rule having "Final destination page error" -  200 server status ', function() {
      var egStub = ""
      var policyHelper
      var request
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            matchRules: [
              {
                type: "erMatchRule",
                akaRuleId: "3838940efb0bebde",
                location:
                  "/cloudlets/api/v2/policies/6804/versions/1/rules/3838940efb0bebde",
                matches: [
                  {
                    matchOperator: "equals",
                    matchType: "path",
                    matchValue: "/tiny-url/vuudrs"
                  }
                ],
                redirectURL: "https://goo.gl/maps/vUdRS",
                statusCode: 301,
                useIncomingQueryString: true
              }
            ]
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })

        sinon.stub(helper.getProxyRequest(), "get", function(
          sourceUrl,
          callbackFunction
        ) {
          var err = false
          var body = {}
          var policyValidationResultData = {
            statusCode: 200,
            request: {
              uri: { href: "https://www.mydomain.com/page-not-found/" },
              _redirect: {
                redirectsFollowed: 1,
                redirects: [
                  {
                    statusCode: 302,
                    redirectUri: "https://goo.gl/maps/vUdRS"
                  }
                ]
              }
            }
          }
          mockResponse.status(200)
          callbackFunction(err, policyValidationResultData, body)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
        helper.getProxyRequest().get.restore()
      })
      it("Testing validate policy for 200 server status ", function(done) {
        helper.validatePolicyRules(
          mockRequest,
          mockResponse,
          "1",
          "1",
          "staging"
        )
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()
        // Final destination page error scenario
        expect(data[0]["source"]).to.be.a("string")
        expect(data[0]["destination"]).to.be.an("string")
        expect(data[0]["statusCode"]).to.be.an("number")
        expect(data[0]["finalDestination"]).to.be.an("string")
        expect(data[0]["redirectsFollowed"]).to.be.an("number")
        expect(data[0]["redirects"]).to.be.an("array")
        expect(data[0]["validation"]).to.be.an("boolean")
        expect(data[0]["message"]).to.be.an("string")

        expect(data[0]["source"]).to.equal(
          "http://www-beta.mydomain.com/tiny-url/vuudrs"
        )
        expect(data[0]["destination"]).to.equal("https://goo.gl/maps/vUdRS")
        expect(data[0]["statusCode"]).to.equal(200)
        expect(data[0]["finalDestination"]).to.equal(
          "https://www.mydomain.com/page-not-found/"
        )
        expect(data[0]["redirectsFollowed"]).to.equal(1)
        expect(data[0]["redirects"].length).to.equal(1)
        expect(data[0]["validation"]).to.equal(false)
        expect(data[0]["message"]).to.equal("Final destination page error.")

        done()
      })
    })

    describe('Testing validate STAGING policy with a rule having "No redirect occurred error" -  200 server status ', function() {
      var egStub = ""
      var policyHelper
      var request
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            matchRules: [
              {
                type: "erMatchRule",
                akaRuleId: "3838940efb0bebde",
                location:
                  "/cloudlets/api/v2/policies/6804/versions/1/rules/3838940efb0bebde",
                matches: [
                  {
                    matchOperator: "equals",
                    matchType: "path",
                    matchValue: "/tiny-url/abc"
                  }
                ],
                redirectURL: "https://goo.gl/maps/ABC",
                statusCode: 301,
                useIncomingQueryString: true
              }
            ]
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })

        sinon.stub(helper.getProxyRequest(), "get", function(
          sourceUrl,
          callbackFunction
        ) {
          var err = false
          var body = {}
          var policyValidationResultData = {
            statusCode: 200,
            request: {
              uri: { href: "https://www.mydomain.com/ABC/" },
              _redirect: {
                redirectsFollowed: 0,
                redirects: []
              }
            }
          }
          mockResponse.status(200)
          callbackFunction(err, policyValidationResultData, body)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
        helper.getProxyRequest().get.restore()
      })
      it("Testing validate policy for 200 server status ", function(done) {
        helper.validatePolicyRules(
          mockRequest,
          mockResponse,
          "1",
          "1",
          "staging"
        )
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()

        // No redirect occurred scenario
        expect(data[0]["source"]).to.be.a("string")
        expect(data[0]["destination"]).to.be.an("string")
        expect(data[0]["statusCode"]).to.be.an("number")
        expect(data[0]["finalDestination"]).to.be.an("string")
        expect(data[0]["redirectsFollowed"]).to.be.an("number")
        expect(data[0]["redirects"]).to.be.an("array")
        expect(data[0]["validation"]).to.be.an("boolean")
        expect(data[0]["message"]).to.be.an("string")

        expect(data[0]["source"]).to.equal(
          "http://www-beta.mydomain.com/tiny-url/abc"
        )
        expect(data[0]["destination"]).to.equal("https://goo.gl/maps/ABC")
        expect(data[0]["statusCode"]).to.equal(200)
        expect(data[0]["finalDestination"]).to.equal(
          "https://www.mydomain.com/ABC/"
        )
        expect(data[0]["redirectsFollowed"]).to.equal(0)
        expect(data[0]["redirects"].length).to.equal(0)
        expect(data[0]["validation"]).to.equal(false)
        expect(data[0]["message"]).to.equal("No redirect occurred. ")

        done()
      })
    })

    describe('Testing validate STAGING policy with a rule having "Redirected URL does not match error" -  200 server status ', function() {
      var egStub = ""
      var policyHelper
      var request
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            matchRules: [
              {
                type: "erMatchRule",
                akaRuleId: "3838940efb0bebde",
                location:
                  "/cloudlets/api/v2/policies/6804/versions/1/rules/3838940efb0bebde",
                matches: [
                  {
                    matchOperator: "equals",
                    matchType: "path",
                    matchValue: "http://www-beta.mydomain.com/tiny-url/efg"
                  }
                ],
                redirectURL: "https://goo.gl/maps/EFG",
                statusCode: 301,
                useIncomingQueryString: true
              }
            ]
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })

        sinon.stub(helper.getProxyRequest(), "get", function(
          sourceUrl,
          callbackFunction
        ) {
          var err = false
          var body = {}
          var policyValidationResultData = {
            statusCode: 200,
            request: {
              uri: { href: "https://www.mydomain.com/page-not-found/" },
              _redirect: {
                redirectsFollowed: 1,
                redirects: [
                  {
                    statusCode: 302,
                    redirectUri: "https://goo.gl/maps/vUdRS"
                  }
                ]
              }
            }
          }
          mockResponse.status(200)
          callbackFunction(err, policyValidationResultData, body)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
        helper.getProxyRequest().get.restore()
      })
      it("Testing validate policy for 200 server status ", function(done) {
        helper.validatePolicyRules(
          mockRequest,
          mockResponse,
          "1",
          "1",
          "staging"
        )
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()

        // Redirected URL does not match scenario
        expect(data[0]["source"]).to.be.a("string")
        expect(data[0]["destination"]).to.be.an("string")
        expect(data[0]["statusCode"]).to.be.an("number")
        expect(data[0]["finalDestination"]).to.be.an("string")
        expect(data[0]["redirectsFollowed"]).to.be.an("number")
        expect(data[0]["redirects"]).to.be.an("array")
        expect(data[0]["validation"]).to.be.an("boolean")
        expect(data[0]["message"]).to.be.an("string")

        expect(data[0]["source"]).to.equal(
          "http://www-beta.mydomain.com/tiny-url/efg"
        )
        expect(data[0]["destination"]).to.equal("https://goo.gl/maps/EFG")
        expect(data[0]["statusCode"]).to.equal(200)
        expect(data[0]["finalDestination"]).to.equal(
          "https://www.mydomain.com/page-not-found/"
        )
        expect(data[0]["redirectsFollowed"]).to.equal(1)
        expect(data[0]["redirects"].length).to.equal(1)
        expect(data[0]["validation"]).to.equal(false)
        expect(data[0]["message"]).to.equal(
          "Redirected URL does not match with the rule destination URL. Final destination page error."
        )

        done()
      })
    })

    describe('Testing validate STAGING policy with a rule having "Success" -  200 server status ', function() {
      var egStub = ""
      var policyHelper
      var request
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            matchRules: [
              {
                type: "erMatchRule",
                akaRuleId: "3838940efb0bebde",
                location:
                  "/cloudlets/api/v2/policies/6804/versions/1/rules/3838940efb0bebde",
                matches: [
                  {
                    matchOperator: "equals",
                    matchType: "path",
                    matchValue: "/tiny-url/hijk"
                  }
                ],
                redirectURL: "https://goo.gl/maps/HIJK",
                statusCode: 301,
                useIncomingQueryString: true
              }
            ]
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })

        sinon.stub(helper.getProxyRequest(), "get", function(
          sourceUrl,
          callbackFunction
        ) {
          var err = false
          var body = {}
          var policyValidationResultData = {
            statusCode: 200,
            request: {
              uri: { href: "https://www.mydomain.com/HIJK/" },
              _redirect: {
                redirectsFollowed: 1,
                redirects: [
                  {
                    statusCode: 302,
                    redirectUri: "https://goo.gl/maps/HIJK"
                  }
                ]
              }
            }
          }
          mockResponse.status(200)
          callbackFunction(err, policyValidationResultData, body)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
        helper.getProxyRequest().get.restore()
      })
      it("Testing validate policy for 200 server status ", function(done) {
        helper.validatePolicyRules(
          mockRequest,
          mockResponse,
          "1",
          "1",
          "staging"
        )
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()

        // Redirected URL does not match scenario
        expect(data[0]["source"]).to.be.a("string")
        expect(data[0]["destination"]).to.be.an("string")
        expect(data[0]["statusCode"]).to.be.an("number")
        expect(data[0]["finalDestination"]).to.be.an("string")
        expect(data[0]["redirectsFollowed"]).to.be.an("number")
        expect(data[0]["redirects"]).to.be.an("array")
        expect(data[0]["validation"]).to.be.an("boolean")
        expect(data[0]["message"]).to.be.an("string")

        expect(data[0]["source"]).to.equal(
          "http://www-beta.mydomain.com/tiny-url/hijk"
        )
        expect(data[0]["destination"]).to.equal("https://goo.gl/maps/HIJK")
        expect(data[0]["statusCode"]).to.equal(200)
        expect(data[0]["finalDestination"]).to.equal(
          "https://www.mydomain.com/HIJK/"
        )
        expect(data[0]["redirectsFollowed"]).to.equal(1)
        expect(data[0]["redirects"].length).to.equal(1)
        expect(data[0]["validation"]).to.equal(true)
        expect(data[0]["message"]).to.equal("Success")

        done()
      })
    })

    describe('Testing validate PROD policy with a rule having "Redirected URL does not match error" -  200 server status ', function() {
      var egStub = ""
      var policyHelper
      var request
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            matchRules: [
              {
                type: "erMatchRule",
                akaRuleId: "3838940efb0bebde",
                location:
                  "/cloudlets/api/v2/policies/6804/versions/1/rules/3838940efb0bebde",
                matches: [
                  {
                    matchOperator: "equals",
                    matchType: "path",
                    matchValue: "https://www.mydomain.com/tiny-url/efg"
                  }
                ],
                redirectURL: "https://goo.gl/maps/EFG",
                statusCode: 301,
                useIncomingQueryString: true
              }
            ]
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })

        sinon.stub(helper.getProxyRequest(), "get", function(
          sourceUrl,
          callbackFunction
        ) {
          var err = false
          var body = {}
          var policyValidationResultData = {
            statusCode: 200,
            request: {
              uri: { href: "https://www.mydomain.com/vUdRS/" },
              _redirect: {
                redirectsFollowed: 1,
                redirects: [
                  {
                    statusCode: 302,
                    redirectUri: "https://goo.gl/maps/vUdRS"
                  }
                ]
              }
            }
          }
          mockResponse.status(200)
          callbackFunction(err, policyValidationResultData, body)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
        helper.getProxyRequest().get.restore()
      })
      it("Testing validate policy for 200 server status ", function(done) {
        helper.validatePolicyRules(mockRequest, mockResponse, "1", "1", "prod")
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()

        // Redirected URL does not match scenario
        expect(data[0]["source"]).to.be.a("string")
        expect(data[0]["destination"]).to.be.an("string")
        expect(data[0]["statusCode"]).to.be.an("number")
        expect(data[0]["finalDestination"]).to.be.an("string")
        expect(data[0]["redirectsFollowed"]).to.be.an("number")
        expect(data[0]["redirects"]).to.be.an("array")
        expect(data[0]["validation"]).to.be.an("boolean")
        expect(data[0]["message"]).to.be.an("string")

        expect(data[0]["source"]).to.equal(
          "https://www.mydomain.com/tiny-url/efg"
        )
        expect(data[0]["destination"]).to.equal("https://goo.gl/maps/EFG")
        expect(data[0]["statusCode"]).to.equal(200)
        expect(data[0]["finalDestination"]).to.equal(
          "https://www.mydomain.com/vUdRS/"
        )
        expect(data[0]["redirectsFollowed"]).to.equal(1)
        expect(data[0]["redirects"].length).to.equal(1)
        expect(data[0]["validation"]).to.equal(false)
        expect(data[0]["message"]).to.equal(
          "Redirected URL does not match with the rule destination URL. "
        )

        done()
      })
    })

    describe('Testing validate PROD policy with a rule having "Success" -  200 server status ', function() {
      var egStub = ""
      var policyHelper
      var request
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            matchRules: [
              {
                type: "erMatchRule",
                akaRuleId: "3838940efb0bebde",
                location:
                  "/cloudlets/api/v2/policies/6804/versions/1/rules/3838940efb0bebde",
                matches: [
                  {
                    matchOperator: "equals",
                    matchType: "path",
                    matchValue: "/tiny-url/hijk"
                  }
                ],
                redirectURL: "https://goo.gl/maps/HIJK",
                statusCode: 301,
                useIncomingQueryString: true
              }
            ]
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })

        sinon.stub(helper.getProxyRequest(), "get", function(
          sourceUrl,
          callbackFunction
        ) {
          var err = false
          var body = {}
          var policyValidationResultData = {
            statusCode: 200,
            request: {
              uri: { href: "https://www.mydomain.com/HIJK/" },
              _redirect: {
                redirectsFollowed: 1,
                redirects: [
                  {
                    statusCode: 302,
                    redirectUri: "https://goo.gl/maps/HIJK"
                  }
                ]
              }
            }
          }
          mockResponse.status(200)
          callbackFunction(err, policyValidationResultData, body)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
        helper.getProxyRequest().get.restore()
      })
      it("Testing validate policy for 200 server status ", function(done) {
        helper.validatePolicyRules(mockRequest, mockResponse, "1", "1", "prod")
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()

        // Redirected URL does not match scenario
        expect(data[0]["source"]).to.be.a("string")
        expect(data[0]["destination"]).to.be.an("string")
        expect(data[0]["statusCode"]).to.be.an("number")
        expect(data[0]["finalDestination"]).to.be.an("string")
        expect(data[0]["redirectsFollowed"]).to.be.an("number")
        expect(data[0]["redirects"]).to.be.an("array")
        expect(data[0]["validation"]).to.be.an("boolean")
        expect(data[0]["message"]).to.be.an("string")

        expect(data[0]["source"]).to.equal(
          "https://www.mydomain.com/tiny-url/hijk"
        )
        expect(data[0]["destination"]).to.equal("https://goo.gl/maps/HIJK")
        expect(data[0]["statusCode"]).to.equal(200)
        expect(data[0]["finalDestination"]).to.equal(
          "https://www.mydomain.com/HIJK/"
        )
        expect(data[0]["redirectsFollowed"]).to.equal(1)
        expect(data[0]["redirects"].length).to.equal(1)
        expect(data[0]["validation"]).to.equal(true)
        expect(data[0]["message"]).to.equal("Success")

        done()
      })
    })
  })

  describe("Testing get All versions of a policiy", function() {
    describe("Testing get All versions of a policiy error condition ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var errorData = JSON.stringify({
            status: 404,
            title: "Resource not found"
          })
          mockResponse.status(404)
          fn(errorData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing error condition with 404 status", function(done) {
        helper.getAllVersionsOfAPolicy(mockRequest, mockResponse, 9264)
        expect(mockResponse.statusCode).to.equal(404)
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal(
          "Resource not found"
        )
        done()
      })
    })

    describe("Testing get policy by version for 200 server status ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            location: "/some/location",
            policyId: 1,
            version: 90,
            activations: [],
            createdBy: null
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing get policy by version for 200 server status ", function(
        done
      ) {
        helper.getAllVersionsOfAPolicy(mockRequest, mockResponse, 9264)
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()
        expect(data["location"]).to.be.a("string")
        expect(data["policyId"]).to.be.an("number")
        expect(data["version"]).to.be.an("number")
        expect(data["activations"]).to.be.an("array")
        expect(data["createdBy"]).to.be.undefined

        expect(data["location"]).to.equal("/some/location")
        expect(data["policyId"]).to.equal(1)
        expect(data["version"]).to.equal(90)
        expect(data["activations"].length).to.equal(0)
        done()
      })
    })
  })

  describe("Testing get Active policy by network", function() {
    describe("Testing get Active policy by network error condition ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var errorData = JSON.stringify({
            errorCode: "-1",
            errorMessage: "Bad request"
          })
          mockResponse.status(400)
          fn(errorData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing error condition with 400 status", function(done) {
        helper.getActivePolicy(mockRequest, mockResponse, 11, "dev")
        expect(mockResponse.statusCode).to.equal(404)
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal("Bad request")
        done()
      })
    })

    describe("Testing get Active policy by network no versions error condition ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          fn(JSON.stringify(zeroVersionOfAPolicy), mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("when there is not a single version for the given policy", function(
        done
      ) {
        helper.getActivePolicy(mockRequest, mockResponse, 11, "prod")
        expect(mockResponse.statusCode).to.equal(404)
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal(
          "Resource Not found"
        )
        done()
      })
    })

    describe("Testing get Active policy by network error condition ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          fn(JSON.stringify(noActivePordVersion), mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("when there is not active version for the given network", function(
        done
      ) {
        helper.getActivePolicy(mockRequest, mockResponse, 11, "prod")
        expect(mockResponse.statusCode).to.equal(404)
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal(
          "Resource Not found"
        )
        done()
      })
    })

    describe('Testing get Active policy by network "prod" when "prod" being the latest version ', function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify(latestProdVersionData)
          var match = /\/([0-9]{1,})$/.exec(this.request.path)
          if (match && match.length > 1) {
            //second send call for policy and version input
            var retrievedVersion = match[1]
            mockResponse.status(200)
            mockResponse.send({ version: parseInt(retrievedVersion) })
          } else {
            //First send call for all versions of a policy
            mockResponse.send(200)
            fn(policyData, mockResponse)
          }
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing get Active policy by network 'prod' when 'prod' being the latest version ", function(
        done
      ) {
        helper.getActivePolicy(mockRequest, mockResponse, 11, "prod")
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()

        expect(data["version"]).to.be.an("number")
        expect(data["version"]).to.equal(2)
        done()
      })
    })

    describe('Testing get Active policy by network "prod" when "prod" not being the latest version ', function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify(prodIsNotLatestVersion)
          var match = /\/([0-9]{1,})$/.exec(this.request.path)
          if (match && match.length > 1) {
            //second send call for policy and version input
            var retrievedVersion = match[1]
            mockResponse.status(200)
            mockResponse.send({ version: parseInt(retrievedVersion) })
          } else {
            //First send call for all versions of a policy
            mockResponse.send(200)
            fn(policyData, mockResponse)
          }
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing get Active policy by network 'prod' when 'prod' not being the latest version ", function(
        done
      ) {
        helper.getActivePolicy(mockRequest, mockResponse, 11, "prod")
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()

        expect(data["version"]).to.be.an("number")
        expect(data["version"]).to.equal(1)
        done()
      })
    })

    describe('Testing get Active policy by network "dev" ', function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify(latestProdVersionData)
          mockResponse.send(200)
          fn(policyData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("when 'prod' being the latest version ", function(done) {
        helper.getActivePolicy(mockRequest, mockResponse, 11, "dev")
        expect(mockResponse.statusCode).to.equal(404)
        var data = mockResponse._getData()
        expect(data["code"]).to.equal(404)
        expect(data["message"]).to.equal("Resource Not found")
        done()
      })
    })

    describe('Testing get Active policy by network "dev" ', function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify(devActivePolicyAscVersionNumber)
          var match = /\/([0-9]{1,})$/.exec(this.request.path)
          if (match && match.length > 1) {
            //second send call for policy and version input
            var retrievedVersion = match[1]
            mockResponse.status(200)
            mockResponse.send({ version: parseInt(retrievedVersion) })
          } else {
            //First send call for all versions of a policy
            mockResponse.send(200)
            fn(policyData, mockResponse)
          }
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("when latest version is not active for any network and data returned by akamai in descending order of versions.", function(
        done
      ) {
        helper.getActivePolicy(mockRequest, mockResponse, 11, "dev")
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()

        expect(data["version"]).to.be.an("number")
        expect(data["version"]).to.equal(2)
        done()
      })
    })

    describe('Testing get Active policy by network "dev" ', function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify(devActivePolicyDescVersionNumber)
          var match = /\/([0-9]{1,})$/.exec(this.request.path)
          if (match && match.length > 1) {
            //second send call for policy and version input
            var retrievedVersion = match[1]
            mockResponse.status(200)
            mockResponse.send({ version: parseInt(retrievedVersion) })
          } else {
            //First send call for all versions of a policy
            mockResponse.send(200)
            fn(policyData, mockResponse)
          }
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("when latest version is not active for any network and data returned by akamai in descending order of versions.", function(
        done
      ) {
        helper.getActivePolicy(mockRequest, mockResponse, 11, "dev")
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()

        expect(data["version"]).to.be.an("number")
        expect(data["version"]).to.equal(2)
        done()
      })
    })
  })

  describe("Testing get all activation information", function() {
    describe("Testing get policy by version error condition ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var errorData = JSON.stringify({
            errorCode: "-1",
            errorMessage: "Resource not found"
          })
          mockResponse.status(404)
          fn(errorData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing error condition with 404 status", function(done) {
        helper.getAllActivationInfo(mockRequest, mockResponse, 1)
        expect(mockResponse.statusCode).to.equal(404)
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal(
          "Resource not found"
        )
        done()
      })
    })
    describe("Testing get policy by version error condition -- no activations", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var errorData = JSON.stringify([])
          mockResponse.status(404)
          fn(errorData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing get policy by version error condition -- no activations", function(
        done
      ) {
        helper.getAllActivationInfo(mockRequest, mockResponse, 1)
        expect(mockResponse.statusCode).to.equal(404)
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal(
          "No activations on this policy"
        )
        done()
      })
    })
    describe("Testing get all activation info with one activated version", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            location: "/some/location",
            policyId: 1,
            version: 90,
            activations: [
              {
                apiVersion: "2.0",
                network: "prod",
                policyInfo: {
                  policyId: 9946,
                  name: "Cloudlet_API_Redirector",
                  version: 97,
                  status: "active",
                  statusDetail:
                    "File successfully deployed to Akamai's network",
                  detailCode: 4000,
                  activatedBy: "dev2@mydomain.com",
                  activationDate: 1461957506000
                },
                propertyInfo: {
                  name: "team.mydomain.com.com",
                  groupId: 45866,
                  status: "inactive"
                }
              }
            ],
            createdBy: null
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing get all activation info with one activated version", function(
        done
      ) {
        helper.getAllActivationInfo(mockRequest, mockResponse, 1)
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()
        expect(data["location"]).to.be.a("string")
        expect(data["policyId"]).to.be.an("number")
        expect(data["version"]).to.be.an("number")
        expect(data["activations"]).to.be.an("array")
        expect(data["createdBy"]).to.be.undefined

        expect(data["location"]).to.equal("/some/location")
        expect(data["policyId"]).to.equal(1)
        expect(data["version"]).to.equal(90)
        expect(data["activations"].length).to.equal(1)
        expect(data["activations"][0]["network"]).to.equal("prod")
        expect(data["activations"][0]["policyInfo"]).to.be.an("object")
        expect(data["activations"][0]["policyInfo"]["policyId"]).to.equal(9946)
        expect(data["activations"][0]["propertyInfo"]).to.be.an("object")
        expect(data["activations"][0]["propertyInfo"]["name"]).to.equal(
          "team.mydomain.com.com"
        )
        done()
      })
    })
    describe("Testing get all activation info with multiple activated versions", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            location: "/some/location",
            policyId: 1,
            version: 90,
            activations: [
              {
                apiVersion: "2.0",
                network: "prod",
                policyInfo: {
                  policyId: 9946,
                  name: "Cloudlet_API_Redirector",
                  version: 97,
                  status: "active",
                  statusDetail:
                    "File successfully deployed to Akamai's network",
                  detailCode: 4000,
                  activatedBy: "dev2@mydomain.com",
                  activationDate: 1461957506000
                },
                propertyInfo: {
                  name: "team.mydomain.com.com",
                  groupId: 45866,
                  status: "inactive"
                }
              },
              {
                apiVersion: "2.0",
                network: "staging",
                policyInfo: {
                  policyId: 9946,
                  name: "Cloudlet_API_Redirector",
                  version: 99,
                  status: "deactivated",
                  statusDetail:
                    "File successfully deployed to Akamai's network",
                  detailCode: 4000,
                  activatedBy: "dev3@mydomain.com",
                  activationDate: 1461167126000
                },
                propertyInfo: {
                  name: "team.mydomain.com.com",
                  version: 4,
                  groupId: 45866,
                  status: "active",
                  activatedBy: "dev2@mydomain.com",
                  activationDate: 1459179215000
                }
              }
            ],
            createdBy: null
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing get all activation info with multiple activated versions", function(
        done
      ) {
        helper.getAllActivationInfo(mockRequest, mockResponse, 1)
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()
        expect(data["location"]).to.be.a("string")
        expect(data["policyId"]).to.be.an("number")
        expect(data["version"]).to.be.an("number")
        expect(data["activations"]).to.be.an("array")
        expect(data["createdBy"]).to.be.undefined

        expect(data["location"]).to.equal("/some/location")
        expect(data["policyId"]).to.equal(1)
        expect(data["version"]).to.equal(90)
        expect(data["activations"].length).to.equal(2)
        expect(data["activations"][0]["network"]).to.equal("prod")
        expect(data["activations"][0]["policyInfo"]).to.be.an("object")
        expect(data["activations"][0]["policyInfo"]["policyId"]).to.equal(9946)
        expect(data["activations"][0]["propertyInfo"]).to.be.an("object")
        expect(data["activations"][0]["propertyInfo"]["name"]).to.equal(
          "team.mydomain.com.com"
        )
        expect(data["activations"][1]["network"]).to.equal("staging")
        expect(data["activations"][1]["policyInfo"]).to.be.an("object")
        expect(data["activations"][1]["policyInfo"]["policyId"]).to.equal(9946)
        expect(data["activations"][1]["propertyInfo"]).to.be.an("object")
        expect(data["activations"][1]["propertyInfo"]["name"]).to.equal(
          "team.mydomain.com.com"
        )
        done()
      })
    })
  })

  describe("POST new version", function() {
    describe("POST new version error condition ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var errorData = JSON.stringify({
            errorCode: "-1",
            errorMessage: "Resource not found"
          })
          mockResponse.status(404)
          fn(errorData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing error condition with 404 status", function(done) {
        helper.postNewVersion(mockRequest, mockResponse, 9945, { data: "data" })
        //expect(mockResponse.statusCode).to.equal(404);
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal(
          "Resource not found"
        )
        done()
      })
    })
    describe("Testing POST new version 200 server status ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            location: "/some/location",
            policyId: 1,
            version: 90,
            activations: [],
            createdBy: null
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing get policy by version for 200 server status ", function(
        done
      ) {
        helper.postNewVersion(mockRequest, mockResponse, 9946, {
          description: "string",
          matchRuleFormat: "1.0",
          matchRules: [
            {
              matches: [
                {
                  caseSensitive: true,
                  matchOperator: "contains",
                  matchType: "path",
                  matchValue: "/unittest",
                  negate: true
                }
              ],
              redirectURL: "www.unittest.com",
              matchURL: "string",
              statusCode: 301,
              type: "erMatchRule",
              name: "string"
            }
          ]
        })
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()
        expect(data["location"]).to.be.a("string")
        expect(data["policyId"]).to.be.an("number")
        expect(data["version"]).to.be.an("number")
        expect(data["activations"]).to.be.an("array")
        expect(data["createdBy"]).to.be.undefined

        expect(data["location"]).to.equal("/some/location")
        expect(data["policyId"]).to.equal(1)
        expect(data["version"]).to.equal(90)
        expect(data["activations"].length).to.equal(0)
        done()
      })
    })
  })

  describe("Add new rule", function() {
    describe("Add new rule error condition ", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var errorData = JSON.stringify({
            errorCode: "-1",
            errorMessage: "Resource not found"
          })
          mockResponse.status(404)
          fn(errorData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing error condition with 404 status", function(done) {
        helper.addRule(mockRequest, mockResponse, 9945, 121, { data: "data" })
        //expect(mockResponse.statusCode).to.equal(404);
        expect(mockResponse._getData()["code"]).to.equal(404)
        expect(mockResponse._getData()["message"]).to.equal(
          "Resource not found"
        )
        done()
      })
    })
    describe("Testing Add One New Rule200", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            location: "/cloudlets/api/v2/policies/9946/versions/121",
            revisionId: 127571,
            policyId: 9946,
            version: 121,
            description: "string",
            createdBy: "dev2@mydomain.com",
            createDate: 1461938340444,
            lastModifiedBy: "dev2@mydomain.com",
            lastModifiedDate: 1462460987663,
            activations: [],
            matchRules: [
              {
                type: "erMatchRule",
                akaRuleId: "3f6dc3ddbb87d9ad",
                location:
                  "/cloudlets/api/v2/policies/9946/versions/121/rules/3f6dc3ddbb87d9ad",
                matches: [
                  {
                    matchOperator: "contains",
                    matchType: "path",
                    matchValue: "/putting"
                  }
                ],
                redirectURL: "http://www.tohere.com",
                statusCode: 301
              },
              {
                type: "erMatchRule",
                akaRuleId: "8b666369c39796a6",
                location:
                  "/cloudlets/api/v2/policies/9946/versions/121/rules/8b666369c39796a6",
                matchURL: "string",
                matches: [
                  {
                    caseSensitive: true,
                    matchOperator: "contains",
                    matchType: "path",
                    matchValue: "/string",
                    negate: true
                  }
                ],
                name: "string",
                redirectURL: "www.string.com",
                statusCode: 301
              }
            ],
            matchRuleFormat: "1.0"
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing add one new rule 200", function(done) {
        helper.addRule(mockRequest, mockResponse, 9946, 121, {
          description: "string",
          matchRuleFormat: "1.0",
          matchRules: [
            {
              matches: [
                {
                  caseSensitive: true,
                  matchOperator: "contains",
                  matchType: "path",
                  matchValue: "/string",
                  negate: true
                }
              ],
              redirectURL: "string",
              matchURL: "string",
              statusCode: 301,
              type: "erMatchRule",
              name: "string"
            }
          ]
        })
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()
        expect(data["location"]).to.be.a("string")
        expect(data["policyId"]).to.be.an("number")
        expect(data["version"]).to.be.an("number")
        expect(data["activations"]).to.be.an("array")
        expect(data["createdBy"]).to.be.an("string")

        expect(data["location"]).to.equal(
          "/cloudlets/api/v2/policies/9946/versions/121"
        )
        expect(data["policyId"]).to.equal(9946)
        expect(data["version"]).to.equal(121)
        expect(data["activations"].length).to.equal(0)
        done()
      })
    })
    describe("Testing Add Multple New Rules 200", function() {
      var egStub = ""
      before(function() {
        sinon.stub(helper.getEdgeGridClient(), "send", function(fn) {
          var policyData = JSON.stringify({
            location: "/cloudlets/api/v2/policies/9946/versions/121",
            revisionId: 127571,
            policyId: 9946,
            version: 121,
            description: "string",
            createdBy: "dev2@mydomain.com",
            createDate: 1461938340444,
            lastModifiedBy: "dev2@mydomain.com",
            lastModifiedDate: 1462460987663,
            activations: [],
            matchRules: [
              {
                type: "erMatchRule",
                akaRuleId: "3f6dc3ddbb87d9ad",
                location:
                  "/cloudlets/api/v2/policies/9946/versions/121/rules/3f6dc3ddbb87d9ad",
                matches: [
                  {
                    matchOperator: "contains",
                    matchType: "path",
                    matchValue: "/putting"
                  }
                ],
                redirectURL: "http://www.tohere.com",
                statusCode: 301
              },
              {
                type: "erMatchRule",
                akaRuleId: "8b666369c39796a6",
                location:
                  "/cloudlets/api/v2/policies/9946/versions/121/rules/8b666369c39796a6",
                matchURL: "string",
                matches: [
                  {
                    caseSensitive: true,
                    matchOperator: "contains",
                    matchType: "path",
                    matchValue: "/string",
                    negate: true
                  }
                ],
                name: "string",
                redirectURL: "www.string.com",
                statusCode: 301
              },
              {
                type: "erMatchRule",
                akaRuleId: "eb4fc5d7c6b34375",
                location:
                  "/cloudlets/api/v2/policies/9946/versions/121/rules/eb4fc5d7c6b34375",
                matchURL: "string",
                matches: [
                  {
                    caseSensitive: true,
                    matchOperator: "contains",
                    matchType: "path",
                    matchValue: "/string2",
                    negate: true
                  }
                ],
                name: "string",
                redirectURL: "www.string2.com",
                statusCode: 301
              }
            ],
            matchRuleFormat: "1.0"
          })
          mockResponse.status(200)
          fn(policyData, mockResponse)
        })
      })
      after(function() {
        helper.getEdgeGridClient().send.restore()
      })
      it("Testing add muliple new rule 200", function(done) {
        helper.addRule(mockRequest, mockResponse, 9946, 121, {
          description: "string",
          matchRuleFormat: "1.0",
          matchRules: [
            {
              matches: [
                {
                  caseSensitive: true,
                  matchOperator: "contains",
                  matchType: "path",
                  matchValue: "/string",
                  negate: true
                }
              ],
              redirectURL: "string",
              matchURL: "string",
              statusCode: 301,
              type: "erMatchRule",
              name: "string"
            },
            {
              matches: [
                {
                  caseSensitive: true,
                  matchOperator: "contains",
                  matchType: "path",
                  matchValue: "/string2",
                  negate: true
                }
              ],
              redirectURL: "www.string2.com",
              matchURL: "string",
              statusCode: 301,
              type: "erMatchRule",
              name: "string"
            }
          ]
        })
        expect(mockResponse.statusCode).to.equal(200)
        var data = mockResponse._getData()
        expect(data["location"]).to.be.a("string")
        expect(data["policyId"]).to.be.an("number")
        expect(data["version"]).to.be.an("number")
        expect(data["activations"]).to.be.an("array")
        expect(data["createdBy"]).to.be.an("string")

        expect(data["location"]).to.equal(
          "/cloudlets/api/v2/policies/9946/versions/121"
        )
        expect(data["policyId"]).to.equal(9946)
        expect(data["version"]).to.equal(121)
        expect(data["activations"].length).to.equal(0)
        expect(data["matchRules"].length).to.equal(3)
        done()
      })
    })
  })
})
