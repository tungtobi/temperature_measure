package Controllers

import (
	"fmt"
	"log"
	"net/http"
	"rest-test/Models"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func stringToTime(timeInput string) (timeOutput time.Time) {
	unixTime, err := strconv.Atoi(timeInput)
	if err != nil {
		log.Println(err)
	}
	timeOutput = time.Unix(int64(unixTime), 0)
	return timeOutput
}

func GetTemperature(c *gin.Context) {
	var temp []Models.Temperature
	startTime := stringToTime(c.Query("startTime"))
	endTime := stringToTime(c.Query("endTime"))

	err := Models.GetTemprature(&temp, startTime, endTime)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, temp)
	}
}

func CreateTemperature(c *gin.Context) {
	var temp Models.Temperature
	c.BindJSON(&temp)
	fmt.Println(temp)
	err := Models.CreateTemperature(&temp)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, temp)
	}
}
