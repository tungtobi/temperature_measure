package main

import (
	"fmt"
	"rest-test/Config"
	"rest-test/Models"
	"rest-test/Routes"
	"rest-test/Service"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var err error

func main() {
	go Service.Listen("broker.emqx.io:1883", "haupc/123", "haupc8899")
	Config.DB, err = gorm.Open("mysql", Config.DbURL(Config.BuildDBConfig()))

	if err != nil {
		fmt.Println("Status:", err)
	}

	defer Config.DB.Close()
	Config.DB.AutoMigrate(&Models.Temperature{})

	r := Routes.SetupRouter()
	//running
	r.Run()
}
