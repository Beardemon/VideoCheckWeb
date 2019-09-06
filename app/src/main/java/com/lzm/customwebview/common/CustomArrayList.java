package com.lzm.customwebview.common;

import java.util.ArrayList;

public class CustomArrayList<T> extends ArrayList<T> {
	public CustomArrayList addObject(T t){
		super.add(t);
		return this;
	}
}
